// Initialize Firebase
var config = {
  apiKey: "AIzaSyCWjs-R7KWD1Hqg1Ve4h1ZGynj06XbB-JQ",
  authDomain: "avcproject-fae11.firebaseapp.com",
  databaseURL: "https://avcproject-fae11.firebaseio.com",
  storageBucket: "avcproject-fae11.appspot.com",
  messagingSenderId: "1031859806052"
};

firebase.initializeApp(config);

// References
var database = firebase.database(); // database service

$(document).ready(function () {
  var tpatients = $('table').find('tbody');  // table patients
  var patientsRef = database.ref("patients/"); // database patients 

  patientsRef.once("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      console.log(childSnapshot.val().pid);
      tpatients.append($('<tr>')
        .append($('<td>')
          .text(childSnapshot.val().pid)
        )
        .append($('<td>')
          .text(childSnapshot.val().pname)
        )
      )
    });
  });
});

function writeUserData() {
  var pnumber = $("#pnumber").val();
  var pname = $("#pname").val();

  database.ref('patients/' + pnumber).set({
    pid: pnumber,
    pname: pname
  });
}

function readUserData() {
}