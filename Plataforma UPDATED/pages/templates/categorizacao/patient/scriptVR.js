// References
var storageRef = firebase.storage().ref(); // storage service
var database = firebase.database(); // database service

// Global variables
var myParam = location.search.split('param=')[1]
var templatesRef = database.ref("templates/" + myParam); // database templates
var arrayTotal = [];
var categorias = [];
var images = [];
var counter = 0;
var x = -1;
var y = 2.5;
var z = -1.5;
var entityImg = [], entityCat = [];
var sceneEl;
var antigaImgSelecionada = null;
var imgSelecionada = null;
var selected = false;

////////////////////////// AFRAME.utils.device.isMobile ()

templatesRef.once("value", function (snapshot) {

        categorias = $.map(snapshot.val() ,function(value, index){
          return [index];
        });
        categorias.pop(); //tira o tipo
//        console.log(categorias + " asdsad"); //carros, pizza

        arrayTotal = $.map(snapshot.val() ,function(value, index){
          return [value];
        });
        arrayTotal.pop(); //tira o tipo
        console.log(arrayTotal);

        for (var i = 0; i < arrayTotal.length; i++) {
          for (var j = 0; j < arrayTotal[i].length; j++) {
            storageRef.child('templates/categorizacao/' + arrayTotal[i][j]).getDownloadURL().then(function (url) {
              //images.push(url);
            });
          }
        }
        images.push('1.JPG');
        images.push('241.JPG');
        images.push('421.JPG');
        images.push('552.JPG');
        console.log(images);
        start();

      });
//start();

function start() {

    
    counter = images.length;
    var col; //height;

    inserirImagens();

    if (entityImg[0] != null){
      entityImg[0].addEventListener('click', function () { 
        clicado(entityImg[0]);
      });
    }

    if (entityImg[1] != null){
      entityImg[1].addEventListener('click', function () { 
        clicado(entityImg[1]);
      });
    }

    if (entityImg[2] != null){
      entityImg[2].addEventListener('click', function () { 
        clicado(entityImg[2]);
      });
    }

    if (entityImg[3] != null){
      entityImg[3].addEventListener('click', function () { 
        clicado(entityImg[3]);
      });
    }

};

function inserirImagens(){
  // inserir categorias
  sceneEl = document.querySelector('#imgs');
  var s = document.querySelector('a-scene');
  
  for (var i = 0; i < categorias.length; i++) {
    entityCat.push(document.createElement('a-entity'));
    entityCat[i].setAttribute('id', "categoria"+i);
    entityCat[i].setAttribute('geometry', {
      primitive: 'plane',
      width: 0.85,
      height: 0.85
    });
    entityCat[i].setAttribute('material', {
      color: 'white',
      opacity: 0.5
    });
    entityCat[i].setAttribute('position', x + ' ' + y + ' ' + z);
    entityCat[i].setAttribute('text', {
      value: categorias[i],
      color: 'black',
      width: 4,
      align: 'center'
    });

    sceneEl.appendChild(entityCat[i]);
    //console.log(entity[i]);
    
    x+= 1;
    if(i == 2 || i == 5)
      y-=0.2;
    
  }

  y-=1;
  x=-1;
  for (var i = 0; i < images.length; i++) {
    entityImg.push(document.createElement('a-image'));
    entityImg[i].setAttribute('id', "letra"+i);
    entityImg[i].setAttribute('src', images[i]);
    entityImg[i].setAttribute('geometry', {
      primitive: 'plane',
      width: 0.85,
      height: 0.85
    });
    
    entityImg[i].setAttribute('position', x + ' ' + y + ' ' + z);
        //
    sceneEl.appendChild(entityImg[i]);
    //console.log(entity[i]);
    
    x+= 1;
    if(i == 2 || i == 5){
      y-=1.1;
      x=-1;
    }
    }


  };

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

function clicado(img){
  imgSelecionada = img;
  if (selected){
    antigaImgSelecionada.setAttribute('material', 'opacity', 1);
  }

  imgSelecionada.setAttribute('material', {
      color: 'white',
      opacity: 0.25
    });

  antigaImgSelecionada = imgSelecionada;
  selected = true;

  console.log(imgSelecionada);
  //////////////////////// eventListener /////////////////////////////////////////////
  if(imgSelecionada != null)
  entityCat[0].addEventListener('click', function () { 
    
    if(contains(arrayTotal[0], imgSelecionada.getAttribute('src'))){
      console.log("YYYYYY");
      imgSelecionada.setAttribute('material', 'visible', 'false');
      selected = false;
      imgSelecionada = null;
      checkIfDone();
    }

  });

  entityCat[1].addEventListener('click', function () { 
    
    if(contains(arrayTotal[1], imgSelecionada.getAttribute('src'))){
      console.log("YYYYYY");
      imgSelecionada.setAttribute('material', 'visible', 'false');
      selected = false;
      imgSelecionada = null;
      checkIfDone();
    }

  });



  //////////////////////// eventListener /////////////////////////////////////////////

}

function checkIfDone(){
  counter--;
  
  if (counter == 0) {
        var v = sceneEl.querySelectorAll('a-entity');
    //console.log(v);

    for (var i = 0; i < v.length; i++) {
      v[i].parentNode.removeChild(v[i]);
    }

    var a = document.createElement('a-entity');
    a.setAttribute('id', "fim");
    a.setAttribute('geometry', {
      primitive: 'plane',
      width: 2.5,
      height: 1
    });
    a.setAttribute('material', {
      color: 'green'
    });
    a.setAttribute('position', '0  2 -1.5');
    a.setAttribute('text', {
      value: "MUITO BEM! CONCLUIU A TAREFA COM SUCESSO!\n\nClique aqui para sair.",
      color: 'white'
    });

    //
    sceneEl.appendChild(a);

    a.addEventListener('click', function () {
      console.log("teste");
      window.location.replace("../../../patients_side/dashboardVR.html");
    });
      }
};


function contains(array, source) {
    var i = array.length;
    while (i--) {
       if (array[i].toUpperCase() === source.toUpperCase()) {
           return true;
       }
    }
    return false;
}
