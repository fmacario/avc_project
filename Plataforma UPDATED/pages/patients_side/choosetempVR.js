// References
var database = firebase.database(); // database service
var auth = firebase.auth();         // auth service

var entity = [];
var sceneEl;
var x = 0;
var y = 2;

firebase.auth().onAuthStateChanged(function (user) {
  sceneEl = document.querySelector('a-scene');
  if (user) {
    var username = (user.email).split('@')[0];
    var refTemplates = database.ref('patients/' + username);
    refTemplates.once("value", function (snapshot) {
      for (var i = 0; i < snapshot.val().ptemplates.length; i++) {
        entity.push(document.createElement('a-entity'));
        entity[i].setAttribute('id', snapshot.val().ptemplates[i]);
        entity[i].setAttribute('func', snapshot.val().ptemplates[i]);
        entity[i].setAttribute('id', snapshot.val().ptemplates[i]);
        entity[i].setAttribute('geometry', {
        primitive: 'plane',
        width: 2.5,
        height: 0.2
        });
        entity[i].setAttribute('material', 'color: white');
        entity[i].setAttribute('position', '0 ' + y + ' -1.5');
        entity[i].setAttribute('text', {
          value: snapshot.val().ptemplates[i],
          color: 'black',
          align: 'center'
        });

        var a = entity[i].getAttribute('func');
        console.log(a);
        sceneEl.appendChild(entity[i]);

        entity[i].addEventListener('click', function () {
          //var l = entity[i].getAttribute('func');

          redirect(a);
        });
        
        y -= 0.3;
   }
    });
  } else {
    // No user is signed in.
  }
});

function redirect(pagina) { 
  var refTemplates2 = database.ref('templates/' + pagina);
  refTemplates2.once("value", function (snapshot) {
    window.location = '../../pages/templates/' + snapshot.val().tipo + '/patient/patientVR.html' + '?param=' + pagina;
  });

}
