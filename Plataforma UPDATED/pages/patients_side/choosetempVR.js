
var entity = [];
var sceneEl;
var x = 0;
var y = 1.9;
var links = [];
var back, logout, cabecalho;

// References
var database = firebase.database(); // database service
var auth = firebase.auth();         // auth service

firebase.auth().onAuthStateChanged(function (user) {
  sceneEl = document.querySelector('a-scene');
  console.log(sceneEl);
  if (user) {
    var username = (user.email).split('@')[0];
    var refTemplates = database.ref('patients/' + username);
    refTemplates.once("value", function (snapshot) {
      for (var i = 0; i < snapshot.val().ptemplates.length; i++){
        entity.push(document.createElement('a-entity'));
        entity[i].setAttribute('id', "template"+i);
        entity[i].setAttribute('geometry', {
        primitive: 'plane',
        width: 2.5,
        height: 0.2
        });
        entity[i].setAttribute('material', {
          color: 'white',
          opacity: 0.5
        });
        entity[i].setAttribute('position', '0 ' + y + ' -1.5');
        entity[i].setAttribute('text', {
          value: snapshot.val().ptemplates[i],
          color: 'black',
          align: 'center'
        });
        //entity[i].setAttribute('href', "www.google.pt");

        //console.log(a);
        sceneEl.appendChild(entity[i]);
        y -= 0.25;
        //console.log(entity[i]);
        }
      start();
    });    
  } else {
    // No user is signed in.
  }
});

function redirect(pagina) { 
  var refTemplates2 = database.ref('templates/' + pagina);
  refTemplates2.once("value", function (snapshot) {
    console.log("fodasse");
    window.location = '../../pages/templates/' + snapshot.val().tipo + '/patient/patientVR.html' + '?param=' + pagina;
  });

}

function start(){
  console.log("---------" + sceneEl);

  criarLogout();
  criarVoltarVersaoNormal();
  criarCabecalho();

  if (entity[0] != null)
  entity[0].addEventListener('click', function () { 
    redirect(entity[0].getAttribute('text', 'value').value);
  });

  if (entity[1] != null)
  entity[1].addEventListener('click', function () { 
    redirect(entity[1].getAttribute('text', 'value').value);
  });

  if (entity[2] != null)
  entity[2].addEventListener('click', function () { 
    redirect(entity[2].getAttribute('text', 'value').value);
  });

if (entity[3] != null)
  entity[3].addEventListener('click', function () { 
    redirect(entity[3].getAttribute('text', 'value').value);
  });

  if (entity[4] != null)
  entity[4].addEventListener('click', function () { 
    redirect(entity[4].getAttribute('text', 'value').value);
  });

if (entity[5] != null)
  entity[5].addEventListener('click', function () { 
    redirect(entity[5].getAttribute('text', 'value').value);
  });

if (entity[6] != null)
  entity[6].addEventListener('click', function () { 
    redirect(entity[6].getAttribute('text', 'value').value);
  });

if (entity[7] != null)
  entity[7].addEventListener('click', function () { 
    redirect(entity[7].getAttribute('text', 'value').value);
  });

if (entity[8] != null)
  entity[8].addEventListener('click', function () { 
    redirect(entity[8].getAttribute('text', 'value').value);
  });

if (entity[9] != null)
  entity[9].addEventListener('click', function () { 
    redirect(entity[9].getAttribute('text', 'value').value);
  });

if (entity[10] != null)
  entity[10].addEventListener('click', function () { 
    redirect(entity[10].getAttribute('text', 'value').value);
  });

if (entity[11] != null)
  entity[11].addEventListener('click', function () { 
    redirect(entity[11].getAttribute('text', 'value').value);
  });

if (entity[12] != null)
  entity[12].addEventListener('click', function () { 
    redirect(entity[12].getAttribute('text', 'value').value);
  });

if (entity[13] != null)
  entity[13].addEventListener('click', function () { 
    redirect(entity[13].getAttribute('text', 'value').value);
  });

if (entity[14] != null)
  entity[14].addEventListener('click', function () { 
    redirect(entity[14].getAttribute('text', 'value').value);
  });

if (entity[15] != null)
  entity[15].addEventListener('click', function () { 
    redirect(entity[15].getAttribute('text', 'value').value);
  });

if (entity[16] != null)
  entity[16].addEventListener('click', function () { 
    redirect(entity[16].getAttribute('text', 'value').value);
  });

  

  back.addEventListener('click', function () { 
    window.location.replace("dashboard.html");
  });


  logout.addEventListener('click', function () { 
    firebase.auth().signOut().then(function() { 
        window.location = '../../index.html'; //After successful logs out, user will be redirected to index.html
    }).catch(function(error) {
        console.log(error);
    });

  });
};

 
function criarVoltarVersaoNormal(){
  back = document.createElement('a-entity');
  back.setAttribute('id', 'back');
  back.setAttribute('geometry', {
  primitive: 'plane',
  width: 0.5,
  height: 0.2
  });
  back.setAttribute('material', {
    color: 'black',
    opacity: '0.25'
  });
  back.setAttribute('position', '-1 2.5 -1.5');
  back.setAttribute('text', {
    value: 'Versao Normal\n<-------',
    color: 'white',
    align: 'center',
    width: '1.5'
  });
  
  sceneEl.appendChild(back);
};

function criarLogout(){
  logout = document.createElement('a-entity');
  logout.setAttribute('id', 'back');
  logout.setAttribute('geometry', {
  primitive: 'plane',
  width: 0.5,
  height: 0.2
  });
  logout.setAttribute('material', {
    color: 'red',
    opacity: '0.35'
  });
  logout.setAttribute('position', '1 2.5 -1.5');
  logout.setAttribute('text', {
    value: 'Logout',
    color: 'white',
    align: 'center',
    width: '1.5'
  });
  
  sceneEl.appendChild(logout);
};

function criarCabecalho(){
  cabecalho = document.createElement('a-entity');
  cabecalho.setAttribute('id', 'back');
  cabecalho.setAttribute('geometry', {
  primitive: 'plane',
  width: 1.7,
  height: 0.2
  });
  cabecalho.setAttribute('material', {
    color: 'black',
    opacity: '0.2'
  });
  cabecalho.setAttribute('position', '0 2.2 -1.5');
  cabecalho.setAttribute('text', {
    value: 'Lista de jogos disponiveis, escolha um: ',
    color: 'white',
    align: 'center',
    width: '1.8'
  });
  
  sceneEl.appendChild(cabecalho);
};

document.addEventListener('mouseup', function (){
  $(".a-enter-vr-button button").trigger('click');
});