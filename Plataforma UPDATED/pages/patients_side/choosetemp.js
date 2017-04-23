// References
var database = firebase.database(); // database service
var auth = firebase.auth();         // auth service

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    var username = (user.email).split('@')[0];
    var refTemplates = database.ref('patients/' + username);
        refTemplates.once("value", function (snapshot) {
            for(var i=0; i<snapshot.val().ptemplates.length; i++){
              console.log(snapshot.val().ptemplates);
              var html_block =  "<div class='col-sm-3'>" +
                                  "<button type='button' class='btn btn-primary btn-block btn-flat' style='height:150px;'" + 
                                    "onclick='redirect("+snapshot.val().ptemplates[i]+");'" +
                                    "style='margin: auto;' id="+ snapshot.val().ptemplates[i]+">" + snapshot.val().ptemplates[i] + " </button>" + 
                                "</div>";
              $("#teste").append(html_block);  
            }            
        });
  } else {
    // No user is signed in.
  }
});

function redirect(id){
  console.log(id.id);
  var refTemplates2 = database.ref('templates/' + id.id);
  refTemplates2.once("value", function (snapshot) {
             window.location = '../../pages/templates/'+snapshot.val().tipo+'/patient/patient.html' + '?param=' + id.id;
        });
   
}
