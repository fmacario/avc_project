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
    var refTemplates = database.ref('patients/' + username);
    console.log
    refTemplates.once("value", function (snapshot) {
      for (var i = 0; i < snapshot.val().ptemplates.length; i++) {
        tpatients.replaceWith(table);
        var teste = $("#showtemplates table");
        var templateespaco = snapshot.val().ptemplates[i];
        templateespaco = templateespaco.replace(' ', '_');
        if (jQuery.inArray(templateespaco, ptemplatesdone) !== -1) {
          teste.append($('<tr id="' + templateespaco + '" onclick="redirect(' + templateespaco + ')">')
            .append($('<td>')
              .text(snapshot.val().ptemplates[i])
            )
          )
        }
        else {
          teste.append($('<tr id="' + templateespaco + '" onclick="redirect(' + templateespaco + ')" style="background-color: grey">')
            .append($('<td>')
              .text(snapshot.val().ptemplates[i])
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
  paginaespaco = pagina.id.replace('_', ' ');
  console.log(paginaespaco);
  var refTemplates2 = database.ref('templates/' + paginaespaco);
  refTemplates2.once("value", function (snapshot) {
    console.log(snapshot.val());
    window.location = '../../pages/templates/' + snapshot.val().tipo + '/patient/patient.html' + '?param=' + pagina.id;
  });

};

function goToVR() {
  window.location.replace("dashboardVR.html");
};