
$('#main_div').hide();

// References
var storageRef = firebase.storage().ref(); // storage service
var database = firebase.database(); // database service

// Global variables
var myParam = location.search.split('param=')[1]
var templatesRef = database.ref("templates/" + myParam); // database templates
var order = []; // Array ordenado com nomes das imagens
var images = [];

//statistics
var timer = setInterval(clock, 10);
var msec = 00;
var sec = 00;
var min = 00;

var username;
var attemps = 0;


firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        username = (user.email).split('@')[0];
    } else {
        // No user is signed in.
    }
});


templatesRef.once("value", function (snapshot) {
    templateType = snapshot.val().tipo;
    order = snapshot.val().ordem;
    for (var i = 0; i < order.length; i++) {
        // read images
        storageRef.child('templates/sequence/' + order[i]).getDownloadURL().then(function (url) {
            images.push(url);

            if (images.length == order.length) {
                start();
            }
        });
    }
});

function start() {
    $('.loader').hide('slow');
    $('#main_div').show('slow');


    console.log(images);
    var orilength = images.length;

    var col; //height;

    if (orilength >= 5) {
        //height = 50;
        col = parseInt(12 / orilength) + 1;
    }
    else {
        col = 12 / orilength;
        //height = 100;
    }

    for (var i = 0; i < orilength; i++) {
        var temp = Math.floor((Math.random() * images.length));
        $('#choice_div').append('<div id="choice' + i + '" class="col-sm-' + col + ' single_img_div"> <img id="img' + i + '" src="' + images[temp] + '" class="img" ondragstart="drag(event)"> </div>');
        images.splice(temp, 1);
        $('#answer_div').append('<div id="' + order[i] + '" class="col-sm-' + col + ' single_img_div" ondrop="drop(event, ' + orilength + ')" ondragover="allowDrop(event)"></div>');

    }
}


/*
 var i, col, height, temp, order;
 var num = images.length;
 var temp_images = images.slice();

 if(num>=5){
 height = 50;
 col = parseInt(12/num)+1;
 }
 else{
 col = 12/num;
 height = 100;
 }

 for(i=0; i<num; i++){
 temp = Math.floor((Math.random() * temp_images.length));
 order = images.indexOf(temp_images[temp]);

 $('#choice_div').append('<div style="height:'+height+'%" id="choice'+i+'" class="col-sm-'+col+' single_img_div"> <img id="image'+order+'" src="'+temp_images[temp]+'" class="img" ondragstart="drag(event)"> </div>');
 $('#answer_div').append('<div style="height:'+height+'%" id="answer'+i+'" class="col-sm-'+col+' single_img_div" ondrop="drop(event, '+num+')" ondragover="allowDrop(event)"></div>');


 }


 }
 */
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    console.log('drag');
    ev.dataTransfer.setData("text", ev.target.id);
    ev.dataTransfer.setData("path", ev.target.src);
}

var counter = 0;
function drop(ev, num) {

    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var path = ev.dataTransfer.getData("path");
    var divId = ev.target.id;
    var divIdWithoutSpaces = divId.replace(" ", "%20");
    var node = document.createTextNode("Tente Novamente!");

    if ($('#' + divId + ':has(img)').length == 0) {


        if (path.includes(divId) || path.includes(divIdWithoutSpaces)) {


            var tmp = data.replace("img", "");

            $("#choice" + tmp).hide();
            document.getElementById(divId).appendChild(document.getElementById(data));
            document.getElementById(data).ondragstart = function () { return false; };

            counter++;
            if (counter == num) {
                clearInterval(timer);
                var n = min + "." + sec;
                $('#feedback').append('<h1>Parabéns! Tarefa concluída com sucesso!</h1>');

                database.ref('patients/' + username).once("value", function (snapshot) {
<<<<<<< HEAD
                    database.ref('patients/' + username).set({
                        ntemplates: snapshot.val().ntemplates,
                        ntemplatesdone: snapshot.child("ptemplatesdone").numChildren() + 1,
                        pname: snapshot.val().pname,
                        pprocess: snapshot.val().pprocess,
                        ptemplates: snapshot.val().ptemplates,
                        ptemplatesdone: snapshot.child("ptemplatesdone").val()
=======
                    var finalTemplates = snapshot.child("ptemplates").val();
                    var pprocess = snapshot.child("pprocess").val();
                    var finalTemplatesDone = jQuery.makeArray(snapshot.child("ptemplatesdone").val());
                    finalTemplatesDone.push(myParam);

                    database.ref('patients/' + username).once("value", function (snapshot) {
                        database.ref('patients/' + username + '/ptemplatesdone/' + myParam).set({
                            templatename: myParam,
                            tipotemplate : templateType,
                            tempo : n,
                            tentativas : attemps,

                        });
>>>>>>> ac2047bc45ec75e90097339427ac64f2e591043f
                    });

                    database.ref('patients/' + username + '/ptemplatesdone/' + myParam).set({
                        templatename: myParam,
                        tipotemplate: templateType,
                    });
                });
<<<<<<< HEAD
=======



>>>>>>> ac2047bc45ec75e90097339427ac64f2e591043f
            }
        }
        else {

            document.getElementById(divId).appendChild(node);
            attemps++;
            setTimeout(function () {
                document.getElementById(divId).innerHTML = "";
            }, 1000);
        }
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
