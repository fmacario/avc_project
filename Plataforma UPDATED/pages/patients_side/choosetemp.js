// References
var database = firebase.database(); // database service
var auth = firebase.auth();         // auth service

var tpatients = $('#showtemplates')  // table patients
var table = "<div id='showtemplates' class='box-body table-responsive no-padding'>" +
  "<table class='table table-hover'>" +
  "<tbody>" +
  "<tr><th>Nome</th></tr>" +
  "</tbody>" +
  "</table>" +
  "</div>";

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    var username = (user.email).split('@')[0];

    database.ref('patients/' + username).once("value", function (snapshot) {
      for (var i = 0; i < snapshot.val().ptemplates.length; i++) {
        tpatients.replaceWith(table);

        var teste = $("#showtemplates table"); // Tem de ficar depois da isntrução de replaceWith

        var template = snapshot.child(snapshot.val().ptemplates[i]).key;
        var templatesDone = [];
        snapshot.child("ptemplatesdone").forEach(function (childSnapshot) {
          templatesDone.push(childSnapshot.key);
        });

        if (jQuery.inArray(template, templatesDone) == -1) {
          teste.append($('<tr id="' + template + '" onclick="redirect(' + template + ')">')
            .append($('<td>')
              .text(snapshot.val().ptemplates[i].replace(/_/g, ' '))
            )
          )
        }
        else {
          teste.append($('<tr id="' + template + '" onclick="redirect(' + template + ')" style="background-color: grey">')
            .append($('<td>') 
              .text(snapshot.val().ptemplates[i].replace(/_/g, ' '))
            )
          )
        }
      }
    });
  } else {
    // No user is signed in.
  }
});

function redirect(pagina) {
  var refTemplates2 = database.ref('templates/' + pagina.id);
  refTemplates2.once("value", function (snapshot) {
    console.log(snapshot.val());
    window.location = '../../pages/templates/' + snapshot.val().tipo + '/patient/patient.html' + '?param=' + pagina.id;
  });

};

function goToVR() {
  window.location.replace("dashboardVR.html");
};