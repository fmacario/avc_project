
$('#main_div').hide();


// References
var storageRef = firebase.storage().ref(); // storage service
var database = firebase.database(); // database service

// Global variables
var myParam = location.search.split('param=')[1]
myParamSpace = myParam.replace('_',' ');
var templatesRef = database.ref("templates/" + myParamSpace); // database templates
var arrayTotal = [];
var categorias = [];
var images = [];


templatesRef.once("value", function (snapshot) {

        categorias = $.map(snapshot.val() ,function(value, index){
          return [index];
        });
        categorias.pop(); //tira o tipo

        arrayTotal = $.map(snapshot.val() ,function(value, index){
          return [value];
        });
        arrayTotal.pop(); //tira o tipo
        console.log(arrayTotal);

        for (var i = 0; i < arrayTotal.length; i++) {
          for (var j = 0; j < arrayTotal[i].length; j++) {
            storageRef.child('templates/categorizacao/' + arrayTotal[i][j]).getDownloadURL().then(function (url) {
              images.push(url);
            });
          }
        }

      });

//console.log(images);
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
    $('#img_div').append('<img id="'+images[temp].split('%2F')[2].split('?')[0]+'" src="' + images[temp] + '" class="img" ondragstart="drag(event)">');
    images.remove(images[temp]);
}

for (var i = 0; i < orilength; i++) {
    var array = arrayTotal[i];
    $('#cat_div').append('<div id="'+categorias[i]+'" ondrop="drop(event, '+i+')" ondragover="allowDrop(event)" class="col-sm-' + col + ' single_img_div"><h3>'+categorias[i]+'</h3><div></div></div>');

}


$('loader').hide('slow');
$('#main_div').show('slow');



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
    if ($('#'+divId).is("div")) {

    }else {
      divId = categorias[p];
    }

    //--------------Se a imagem pensense a categoria------------
    if (contains(arrayTotal[p], data.replace(/%20/g, " "))) {

      document.getElementById(divId).appendChild(document.getElementById(data));
      document.getElementById(data).ondragstart = function() { return false; }; //depois de tar numa categoria, nao pode ser removida


      if (counter-- == 1) {
          $('#feed_div').append('<h1>Parabéns! Tarefa concluída com sucesso!</h1>');
      }

    }else {
      document.getElementById(divId).appendChild(node);
      setTimeout(function () {
          document.getElementById(divId).removeChild(node);
      }, 1000);
    }
}
