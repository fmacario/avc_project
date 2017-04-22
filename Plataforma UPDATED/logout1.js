// References
var auth = firebase.auth();

// Adds patient to database
function logout() {
    firebase.auth().signOut().then(function() {
        console.log("sai");
        window.location = '../../../../index.html'; //After successful logs out, user will be redirected to index.html
    }).catch(function(error) {
        console.log(error);
    });
}