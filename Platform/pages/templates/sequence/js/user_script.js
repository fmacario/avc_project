var config = {
    apiKey: "AIzaSyCWjs-R7KWD1Hqg1Ve4h1ZGynj06XbB-JQ",
    authDomain: "avcproject-fae11.firebaseapp.com",
    databaseURL: "https://avcproject-fae11.firebaseio.com",
    storageBucket: "avcproject-fae11.appspot.com",
    messagingSenderId: "1031859806052"
};
// Initialize Firebase
firebase.initializeApp(config);

// References
var storageRef = firebase.storage().ref(); // storage service
var database = firebase.database(); // database service

var templatesRef = database.ref("templates/sequence"); // database templates
var order = []; // Array ordenado com nomes das imagens
var images = [];

templatesRef.once("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
        order = childSnapshot.val().ordem;

        for(var i=0; i<order.length; i++) {
            // read image
            var spaceRef = storageRef.child('templates/sequence/0' + order[i]);
            var path = spaceRef.fullPath;

            storageRef.child('templates/sequence/' + order[i]).getDownloadURL().then(function (url) {
                images.push(url);
            }).catch(function (error) {

            });
            // acaba read image
        }

    })
});

function start(){
    console.log(images);
    var orilength = images.length;

    var col, height;

    if(orilength>=5){
        height = 50;
        col = parseInt(12/orilength)+1;
    }
    else{
        col = 12/orilength;
        height = 100;
    }

    for(var i=0; i<orilength; i++){
        var temp = Math.floor((Math.random() * images.length));
        $('#choice_div').append('<div style="height:'+height+'%" id="choice'+i+'" class="col-sm-'+col+' single_img_div"> <img src="'+images[temp]+'" class="img" ondragstart="drag(event)"> </div>');
        images.splice(temp, 1);
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

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

var counter = 0;
function drop(ev, num) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");

    imageId = data.split("").reverse()[0];
    divId = ev.target.id.split("").reverse()[0];


    if ($("#" + ev.target.id + ':has(img)').length == 0) {
        if (imageId == divId) {
            $('#' + ev.target.id).append(document.getElementById(data));
            counter++;
            if (counter == num) {
                alert('Parabéns! Tarefa concluída com sucesso!');
            }
        }
        else {
            $('#' + ev.target.id).append('<p>Tente novamente</p>');
            setTimeout(function () {
                $('#' + ev.target.id).html("");
            }, 1000);
        }
    }
}*/