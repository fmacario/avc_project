
$('#main_div').hide();


// References
var storageRef = firebase.storage().ref(); // storage service
var database = firebase.database(); // database service

// Global variables
var myParam = location.search.split('param=')[1]
var templatesRef = database.ref("templates/" + myParam); // database templates
var arrayTotal = [];
var categorias = [];
var images = [];


//statistics
var username;
var attemps = 0;
var timer = setInterval(clock, 10);
var msec = 00;
var sec = 00;
var min = 00;

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        username = (user.email).split('@')[0];
    } else {
        // No user is signed in.
    }
});


templatesRef.once("value", function (snapshot) {


    templateType = snapshot.val().tipo;

    categorias = $.map(snapshot.val(), function (value, index) {
        return [index];
    });
    categorias.pop(); //tira o tipo

    arrayTotal = $.map(snapshot.val(), function (value, index) {
        return [value];
    });
    arrayTotal.pop(); //tira o tipo

    var counter = 0;
    for (var x = 0; x < categorias.length; x++) {
        counter += arrayTotal[x].length;
    }

    for (var i = 0; i < arrayTotal.length; i++) {
        for (var j = 0; j < arrayTotal[i].length; j++) {
            storageRef.child('templates/categorizacao/' + arrayTotal[i][j]).getDownloadURL().then(function (url) {
                images.push(url);
                console.log(images);
                if (images.length == counter) {
                    start();
                }
            });
        }
    }
});


function start() {

    $('.loader').hide('slow');
    $('#main_div').show('slow');

    console.log(timer);
    console.log(images);
    var orilength = categorias.length;
    counter = images.length;
    var col; //height;

    if (orilength >= 5) {
        //height = 50;
        col = parseInt(12 / orilength) + 1;
    }
    else {
        col = 12 / orilength;
        //height = 100;
    }


    var until = images.length;
    for (var i = 0; i < until; i++) {
        var temp = Math.floor((Math.random() * images.length));
        $('#img_div').append('<img id="' + images[temp].split('%2F')[2].split('?')[0] + '" src="' + images[temp] + '" class="img" ondragstart="drag(event)">');
        images.remove(images[temp]);
    }

    for (var i = 0; i < orilength; i++) {
        var array = arrayTotal[i];
        $('#cat_div').append('<div id="' + categorias[i] + '" ondrop="drop(event, ' + i + ')" ondragover="allowDrop(event)" class="col-sm-' + col + ' single_img_div"><h3>' + categorias[i] + '</h3><div></div></div>');

    }
}

function clock() {

    msec += 1;
    if (msec == 100) {
        sec += 1;
        msec = 00;
        if (sec == 60) {
            sec = 00;
            min += 1;

        }
    }
    //console.log(min + ":" + sec + ":" + msec);
}



//---- Removes element from array by value ------
Array.prototype.remove = function () {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
}
//------------------------------------

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {


    ev.dataTransfer.setData("nome", ev.target.id); //nome da imagem
    ev.dataTransfer.setData("path", ev.target.src); //src da firebase
}

function contains(a, obj) {
    var i = a.length;
    while (i--) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}

var counter = 0;
function drop(ev, p) {

    ev.preventDefault();
    var data = ev.dataTransfer.getData("nome");
    var path = ev.dataTransfer.getData("path");
    var node = document.createTextNode("Tente Novamente!");
    var divId = ev.target.id;


    //--------Para poder droppar  imagens nas imagens que ja estao na categoria-----
    if ($('#' + divId).is("div")) {

    } else {
        divId = categorias[p];
    }

    //--------------Se a imagem pensense a categoria------------
    if (contains(arrayTotal[p], data.replace(/%20/g, " "))) {

        document.getElementById(divId).appendChild(document.getElementById(data));
        document.getElementById(data).ondragstart = function () { return false; }; //depois de tar numa categoria, nao pode ser removida

        if (counter-- == 1) {
            clearInterval(timer);
            var n = min + "." + sec;
            $('#feed_div').append('<h1>Parabéns! Tarefa concluída com sucesso!</h1>');

            database.ref('patients/' + username).once("value", function (snapshot) {
            var finalTemplates = snapshot.child("ptemplates").val();
            var pprocess = snapshot.child("pprocess").val();
            var finalTemplatesDone = jQuery.makeArray(snapshot.child("ptemplatesdone").val());
            finalTemplatesDone.push(myParam);

            database.ref('patients/' + username).once("value", function (snapshot) {
                database.ref('patients/' + username + '/ptemplatesdone/' + myParam).set({
                    templatename: myParam,
                    tipotemplate : templateType,
                    tentativas : attemps,
                    tempo : n,
                });
            });

        });





        }

    } else {
        document.getElementById(divId).appendChild(node);
        attemps++;
        setTimeout(function () {
            document.getElementById(divId).removeChild(node);
        }, 1000);
    }
}

