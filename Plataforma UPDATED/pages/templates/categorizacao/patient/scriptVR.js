// References
var storageRef = firebase.storage().ref(); // storage service
var database = firebase.database(); // database service

// Global variables
var myParam = location.search.split('param=')[1]
myParamSpace = myParam.replace('%20', ' ');
var templatesRef = database.ref("templates/" + myParamSpace); // database templates

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
var historico = [];
var str = "https://firebasestorage.googleapis.com/v0/b/avcproject-fae11.appspot.com/o/templates%2Fcategorizacao%2F";
var strSize=0;

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
              images.push(url);
            });
          }
        }
       
        setTimeout(function() {
              inserirImagens();
              start();
          }, 1500);

      });

function customEnterVR() {
	var scene = document.querySelector('a-scene');
	if (scene) {
		if (scene.hasLoaded) {
			scene.enterVR();
		} else {
			scene.addEventListener('loaded', scene.enterVR);
		}
	}
}


function start() {
	document.addEventListener('mouseup', customEnterVR);	// 
	document.addEventListener('mousedown', customEnterVR);	// 	
	document.addEventListener('mouseleft', customEnterVR);	// 	
	document.addEventListener('mouseright', customEnterVR);	// 
	
    strSize = str.length;
    counter = images.length;

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

    if (entityImg[4] != null){
      entityImg[4].addEventListener('click', function () { 
        clicado(entityImg[4]);
      });
    }

    if (entityImg[5] != null){
      entityImg[5].addEventListener('click', function () { 
        clicado(entityImg[5]);
      });
    }

    if (entityImg[6] != null){
      entityImg[6].addEventListener('click', function () { 
        clicado(entityImg[6]);
      });
    }

    if (entityImg[7] != null){
      entityImg[7].addEventListener('click', function () { 
        clicado(entityImg[7]);
      });
    }

    if (entityImg[8] != null){
      entityImg[8].addEventListener('click', function () { 
        clicado(entityImg[8]);
      });
    }

    if (entityImg[9] != null){
      entityImg[9].addEventListener('click', function () { 
        clicado(entityImg[9]);
      });
    }

    if (entityImg[10] != null){
      entityImg[10].addEventListener('click', function () { 
        clicado(entityImg[10]);
      });
    }

    if (entityImg[11] != null){
      entityImg[11].addEventListener('click', function () { 
        clicado(entityImg[11]);
      });
    }

    if (entityImg[12] != null){
      entityImg[12].addEventListener('click', function () { 
        clicado(entityImg[12]);
      });
    }

    if (entityImg[13] != null){
      entityImg[13].addEventListener('click', function () { 
        clicado(entityImg[13]);
      });
    }

    if (entityImg[14] != null){
      entityImg[14].addEventListener('click', function () { 
        clicado(entityImg[14]);
      });
    }

    if (entityImg[15] != null){
      entityImg[15].addEventListener('click', function () { 
        clicado(entityImg[15]);
      });
    }

    if (entityImg[16] != null){
      entityImg[16].addEventListener('click', function () { 
        clicado(entityImg[16]);
      });
    }

    if (entityImg[17] != null){
      entityImg[17].addEventListener('click', function () { 
        clicado(entityImg[17]);
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
    if(i == 2 || i == 5){
      y-=0.2;
      x=-1;
    }
    
  }

  y-=1;
  x=-1;
  for (var i = 0; i < images.length; i++) {
    entityImg.push(document.createElement('a-image'));
    entityImg[i].setAttribute('id', "img"+i);
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

  //////////////////////// eventListener /////////////////////////////////////////////

  if (entityCat[0] != null)
  entityCat[0].addEventListener('click', function () { 
    var nome = getNomeImg(imgSelecionada.getAttribute('src'));
    if(imgSelecionada!=null && contains(arrayTotal[0], nome) && !containsObj(historico, imgSelecionada)){
      imgSelecionada.setAttribute('material', 'visible', 'false');
      console.log("FDS3");
      selected = false;
      historico.push(imgSelecionada);
      imgSelecionada = null;
      checkIfDone();
      entityCat[0].getAttribute();
      console.log(entityCat[0]);
    }
  });
  
  if (entityCat[1] != null)
  entityCat[1].addEventListener('click', function () { 
    var nome = getNomeImg(imgSelecionada.getAttribute('src'));
    if(imgSelecionada!=null && contains(arrayTotal[1], nome) && !containsObj(historico, imgSelecionada)){
      imgSelecionada.setAttribute('material', 'visible', 'false');
      selected = false;
      historico.push(imgSelecionada);
      imgSelecionada = null;
      checkIfDone();
    }
  });
  
  if (entityCat[2] != null)
  entityCat[2].addEventListener('click', function () { 
    var nome = getNomeImg(imgSelecionada.getAttribute('src'));
    if(imgSelecionada!=null && contains(arrayTotal[2], nome) && !containsObj(historico, imgSelecionada)){
      imgSelecionada.setAttribute('material', 'visible', 'false');
      selected = false;
      historico.push(imgSelecionada);
      imgSelecionada = null;
      checkIfDone();
    }
  });
  
  if (entityCat[3] != null)
  entityCat[3].addEventListener('click', function () { 
    var nome = getNomeImg(imgSelecionada.getAttribute('src'));
    if(imgSelecionada!=null && contains(arrayTotal[3], nome) && !containsObj(historico, imgSelecionada)){
      imgSelecionada.setAttribute('material', 'visible', 'false');
      selected = false;
      historico.push(imgSelecionada);
      imgSelecionada = null;
      checkIfDone();
    }
  });

  if (entityCat[4] != null)
  entityCat[4].addEventListener('click', function () { 
    var nome = getNomeImg(imgSelecionada.getAttribute('src'));
    if(imgSelecionada!=null && contains(arrayTotal[4], nome) && !containsObj(historico, imgSelecionada)){
      imgSelecionada.setAttribute('material', 'visible', 'false');
      selected = false;
      historico.push(imgSelecionada);
      imgSelecionada = null;
      checkIfDone();
    }
  });

if (entityCat[5] != null)
  entityCat[5].addEventListener('click', function () { 
    var nome = getNomeImg(imgSelecionada.getAttribute('src'));
    if(imgSelecionada!=null && contains(arrayTotal[5], nome) && !containsObj(historico, imgSelecionada)){
      imgSelecionada.setAttribute('material', 'visible', 'false');
      selected = false;
      historico.push(imgSelecionada);
      imgSelecionada = null;
      checkIfDone();
    }
  });



  //////////////////////// eventListener /////////////////////////////////////////////

};

function getNomeImg(sr){
  sr = sr.slice(strSize);
  var s ="";
  for (var i = 0; i < sr.length; i++) {
    var c = sr.charAt(i);
    if(c != '?')
      s+=c;
    else
      return s;
  }
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
      value: "MUITO BEM! CONCLUIU A TAREFA COM SUCESSO! Aguarde.",
      color: 'white'
    });

    //
    sceneEl.appendChild(a);

    setTimeout(function() {
      window.location.replace("../../../patients_side/dashboardVR.html");
          }, 1500);
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
};

function containsObj(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
};