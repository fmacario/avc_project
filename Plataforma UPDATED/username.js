// References
var database = firebase.database();
var auth = firebase.auth()


$(document).ready(function () {

    //Handle Account Status
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var ref = database.ref("patients/"); // database patients
            ref.once("value", function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    if (childSnapshot.val().pname+"@strokerehab.com" === user.email) {
                        $(".username").text(childSnapshot.val().pname);
                    }
                });
            });
        }
    });
});
