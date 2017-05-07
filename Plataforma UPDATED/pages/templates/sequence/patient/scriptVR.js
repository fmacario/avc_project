// References
var storageRef = firebase.storage().ref(); // storage service
var database = firebase.database(); // database service

// Global variables
var myParam = location.search.split('param=')[1]
myParamSpace = myParam.replace('_',' ');
var templatesRef = database.ref("templates/" + myParamSpace); // database templates
var order = []; // Array ordenado com nomes das imagens
var arrayTotal = [];
var categorias = [];
var images = [];
var counter = 0;
var x = -1;
var y = 2.5;
var z = -1.5;
var entityImg = [], entityOrdem = [];
var sceneEl;
var antigaImgSelecionada = null;
var imgSelecionada = null;
var selected = false;
var historico = [];
var str = "https://firebasestorage.googleapis.com/v0/b/avcproject-fae11.appspot.com/o/templates%2Fsequence%2F";

var strSize=0;
var pos = 0;

templatesRef.once("value", function (snapshot) {
        order = snapshot.val().ordem;
        for (var i = 0; i < order.length; i++) {
            // read images
            storageRef.child('templates/sequence/' + order[i]).getDownloadURL().then(function (url) {
                images.push(url);
            });
        }
        setTimeout(function() {
              inserirImagens();
              start();
          }, 1500);
});

function start() {
    strSize = str.length;
    counter = images.length;
    opacity();

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

    
}

function opacity(){
	for (var i = pos+1; i < images.length; i++) {
		entityOrdem[i].setAttribute('material', 'opacity', 0.1);
	}

	
};

function inserirImagens(){
  // inserir categorias
  sceneEl = document.querySelector('#imgs');
  var s = document.querySelector('a-scene');
  
  for (var i = 0; i < images.length; i++) {
  	var pos = i+1;
    entityOrdem.push(document.createElement('a-image'));
    entityOrdem[i].setAttribute('id', "posicao"+i);
    entityOrdem[i].setAttribute('geometry', {
      primitive: 'plane',
      width: 0.85,
      height: 0.85
    });
    entityOrdem[i].setAttribute('material', {
      color: 'white',
      opacity: 1
    });
    entityOrdem[i].setAttribute('position', x + ' ' + y + ' ' + z);
    entityOrdem[i].setAttribute('text', {
      value: ""+pos,
      color: 'black',
      width: 4,
      align: 'center'
    });

    sceneEl.appendChild(entityOrdem[i]);
    //console.log(entity[i]);
    
    x+= 1;
    if(i == 2 || i == 5){
      y-=1;
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

function clicado(img){
  imgSelecionada = img;

  antigaImgSelecionada = imgSelecionada;
  selected = true;

  var nome = getNomeImg(imgSelecionada.getAttribute('src'));

console.log(order[pos]);
  
  nome = nome.replace("%20", " ");

  if(nome.localeCompare(order[pos]) == 0 && !containsObj(historico, imgSelecionada)){
  	console.log("correto");
  	imgSelecionada.setAttribute('material', 'visible', 'false');
  	var img = imgSelecionada.getAttribute('src');
  	entityOrdem[pos].setAttribute('src', img);
  	entityOrdem[pos].setAttribute('text', 'value', '');
	selected = false;
	historico.push(imgSelecionada);
	imgSelecionada = null;
	
  	pos++;
  	if(pos != counter)
  		entityOrdem[pos].setAttribute('material', 'opacity', 1);
  	else
  		isDone();
  }
  else if(nome.localeCompare(order[pos]) != 0){
  	entityOrdem[pos].setAttribute('material', 'color', 'red');
  	setTimeout(function() {
              removerCorVermelha(entityOrdem[pos]);
          }, 1000);
  }

};

function isDone(){
 
    var v = sceneEl.querySelectorAll('a-image');;

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
      
};


function removerCorVermelha(ent){
	ent.setAttribute('material', 'color', 'white');
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
};


function containsObj(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
};