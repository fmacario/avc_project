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