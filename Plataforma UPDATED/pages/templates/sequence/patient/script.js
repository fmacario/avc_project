// References
var storageRef = firebase.storage().ref(); // storage service
var database = firebase.database(); // database service

// Global variables
var myParam = location.search.split('param=')[1]
myParamSpace = myParam.replace('_',' ');
var templatesRef = database.ref("templates/" + myParamSpace); // database templates
var order = []; // Array ordenado com nomes das imagens
var images = [];

templatesRef.once("value", function (snapshot) {
        order = snapshot.val().ordem;
        for (var i = 0; i < order.length; i++) {
            // read images
            storageRef.child('templates/sequence/' + order[i]).getDownloadURL().then(function (url) {
                images.push(url);
            });
        }
});

function start() {
    $('#start').hide();
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
        $('#choice_div').append('<div id="choice' + i + '" class="col-sm-' + col + ' single_img_div"> <img id="img'+i+'" src="' + images[temp] + '" class="img" ondragstart="drag(event)"> </div>');
        images.splice(temp, 1);
        $('#answer_div').append('<div id="'+ order[i] + '" class="col-sm-' + col + ' single_img_div" ondrop="drop(event, ' + orilength + ')" ondragover="allowDrop(event)"></div>');

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
    var divIdWithoutSpaces = divId.replace(" ","%20");
    var node = document.createTextNode("Tente Novamente!");

    if ( $('#' + divId + ':has(img)').length == 0 ) {


        if (path.includes(divId) || path.includes(divIdWithoutSpaces)) {


            var tmp = data.replace("img", "");

            $("#choice"+tmp).hide();
            document.getElementById(divId).appendChild(document.getElementById(data));
            document.getElementById(data).ondragstart = function() { return false; };


            counter++;
            if (counter == num) {
                $('#feedback').append('<h1>Parabéns! Tarefa concluída com sucesso!</h1>');
            }
        }
        else {

            document.getElementById(divId).appendChild(node);
            setTimeout(function () {
                document.getElementById(divId).innerHTML = "";
            }, 1000);
        }
    }
}
