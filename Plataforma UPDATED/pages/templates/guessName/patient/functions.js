var config = {
    apiKey: "AIzaSyCWjs-R7KWD1Hqg1Ve4h1ZGynj06XbB-JQ",
    authDomain: "avcproject-fae11.firebaseapp.com",
    databaseURL: "https://avcproject-fae11.firebaseio.com",
    storageBucket: "avcproject-fae11.appspot.com",
    messagingSenderId: "1031859806052"
};
// Initialize Firebase
firebase.initializeApp(config);

// References
var storageRef = firebase.storage().ref(); // storage service
var database = firebase.database(); // database service

// read metadata
var input;
var nrLetters;
var templatesRef = database.ref("templates/guessname/"); // database templates
var selectedDiv = null;
var letrasEscondidas = [];
var arrayLetters = [];

templatesRef.once("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
        input = childSnapshot.val().input;
        nrLetras = childSnapshot.val().nrLetras;
        mensagensDoDoutor = childSnapshot.val().mensagens;
        console.log(mensagensDoDoutor);

        arrayLetters = input.split('');
        for (var i = 0; i < arrayLetters.length; i++) {
            if (arrayLetters[i] == ' ') {
                $("#inner").append("<div  class=\"row unselectable\" id=\"espaco" + i + "\">&nbsp;</div>");
            }
            else {
                $("#inner").append("<div  class=\"child col-sm-1 unselectable\" id=\"letra" + i + "\">" + arrayLetters[i] + "</div>");
            }
        }

        letrasEscondidas = [];
        var escondePosicao = [];        // posicao das letras a serem escondidas

        /* nao deixa a posicao de esconder ser a mesma */
        for (var i = 0; i < nrLetras; i++) {
            var tmp = Math.floor(Math.random() * (input.length));

            while (arrayLetters[tmp] == " ") {                  //previne que a letra a ser escondida seja um espaco
                tmp = Math.floor(Math.random() * (input.length));
            }

            if (escondePosicao.length == 0) {                 //se array tiver limpo, poe
                escondePosicao [i] = tmp;
            } else {                                             //previne repeticao dentro do array
                if ($.inArray(tmp, escondePosicao) != -1) {
                    i--;
                }
                else {
                    escondePosicao [i] = tmp;
                }
            }
        }

        /* poe background preto para esconder e mete as letras escondidas no array letrasescondidas */
        /* atribui ás letras escondidas a chance de serem clicadas */
        for (var i = 0; i < escondePosicao.length; i++) {
            letrasEscondidas[i] = $("#letra" + escondePosicao[i]).html();
            $("#letra" + escondePosicao[i]).attr('class', 'child col-sm-1 unselectable hided-div');
            $("#letra" + escondePosicao[i]).attr('onclick', 'getSelectedDiv(id)');
        }
    });
});


// read image
var spaceRef = storageRef.child('templates/guessname/teste.jpg');
var path = spaceRef.fullPath;

storageRef.child('templates/guessname/teste.jpg').getDownloadURL().then(function (url) {
    var test = url;
    document.querySelector('#imgid').src = test;
}).catch(function (error) {

});
// acaba read image

//quando botao e clicado
$(":button").click(function () {
    var clickedButton = this.id;
    var selectedLetter = $("#" + selectedDiv).html();

    checkIfDivSelected();

    var certo = false;

    if (true){
    	if (selectedLetter == clickedButton || selectedLetter == clickedButton.toUpperCase()){
    		certo = true;
    	}

    	if (clickedButton == 'a' || clickedButton == 'A'){
    		if(selectedLetter == 'ã' || selectedLetter == 'Ã' || selectedLetter == 'á' || selectedLetter == 'Á')
    			certo = true;
    	}
    	else if (clickedButton == 'o' || clickedButton == 'O'){
    		if(selectedLetter == 'õ' || selectedLetter == 'Õ' || selectedLetter == 'ó' || selectedLetter == 'Ó')
    			certo = true;
    	}
    	else if (clickedButton == 'i' || clickedButton == 'I'){
    		if(selectedLetter == 'í' || selectedLetter == 'Í')
    			certo = true;
    	}
    	else if (clickedButton == 'e' || clickedButton == 'E'){
    		if(selectedLetter == 'é' || selectedLetter == 'É')
    			certo = true;
    	}
    	else if (clickedButton == 'u' || clickedButton == 'U'){
    		if(selectedLetter == 'ú' || selectedLetter == 'Ú')
    			certo = true;
    	}
    }

    if (certo) {
        $("#" + selectedDiv).hide().fadeToggle(1000).attr('class', 'child col-sm-1 unselectable');
        $("#" + selectedDiv).attr('onclick', '');
        selectedDiv = null;
        letrasEscondidas.remove(clickedButton);
        letrasEscondidas.remove(clickedButton.toUpperCase());
    }
    else {
        if (mensagensDoDoutor.length != 0) {  //usa messages dadas pela doutora se ela tiver dado
            $("#message").html("<p id=\"textoAjuda\">" + mensagensDoDoutor[Math.floor(Math.random() * (mensagensDoDoutor.length))] + "</p>");
        }
        else {  //usa messages de ajuda predefinidas
            $("#message").html("<p id=\"textoAjuda\">" + mensagensAjudaRandom[Math.floor(Math.random() * (mensagensAjudaRandom.length))] + "</p>");
        }

        $("#textoAjuda").delay(3000).fadeOut(1000);
    }

    checkIfDone();
});

/* function que esconde os caracteres */
function esconderLetras() {

    escondePosicao = [];        // posicao das letras a serem escondidas

    /* nao deixa a posicao de esconder ser a mesma */
    for (var i = 0; i < nrLetras; i++) {
        var tmp = Math.floor(Math.random() * (input.length));

        while (arrayLetters[tmp] == " ") {                  //previne que a letra a ser escondida seja um espaco
            tmp = Math.floor(Math.random() * (input.length));
        }

        if (escondePosicao.length == 0) {                 //se array tiver limpo, poe
            escondePosicao [i] = tmp;
        } else {                                             //previne repeticao dentro do array
            if ($.inArray(tmp, escondePosicao) != -1) {
                i--;
            }
            else {
                escondePosicao [i] = tmp;
            }
        }
    }

    /* poe background preto para esconder e mete as letras escondidas no array letrasescondidas */
    /* atribui ás letras escondidas a chance de serem clicadas */
    for (var i = 0; i < escondePosicao.length; i++) {
        letrasEscondidas[i] = $("#letra" + escondePosicao[i]).html();
        $("#letra" + escondePosicao[i]).attr('class', 'child col-sm-1 unselectable hided-div');
        $("#letra" + escondePosicao[i]).attr('onclick', 'getSelectedDiv(id)');
    }
}


/* Removes element from array by value*/
Array.prototype.remove = function () {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

function checkIfDone() {
    if (letrasEscondidas.length == 0) {
        $("#message").html("<p id=\"textoAjuda\"><h3>MUITO BEM! CONCLUIU COM SUCESSO A TAREFA!</h3></p>");
        $("button").prop('disabled', true);
    }
}

function getSelectedDiv(div) {
    if (selectedDiv == null) {
        selectedDiv = div;
        $("#" + selectedDiv).attr("class", "child col-sm-1 unselectable hided-selected-div");
    }
    else {
        unselectLastDiv(selectedDiv);
        selectedDiv = div;
        $("#" + selectedDiv).attr("class", "child col-sm-1 unselectable hided-selected-div");
    }

}

function unselectLastDiv(div) {
    $("#" + div).attr("class", "child col-sm-1 unselectable hided-div");
}

function checkIfDivSelected() {
    if (selectedDiv == null) {
        $("#message").html("<p id=\"textoAjuda\">Seleccione um espaço preto para adivinhar a letra!</p>");
        $("#textoAjuda").delay(2000).fadeOut(1000);
        throw new Error("No black area selected");
    }
}

function end(){
	for (var i = 0; i < arrayLetters.length; i++) {
		$("#letra"+i).hide().fadeToggle(1000).attr('class', 'child col-sm-1 unselectable');
              $("#letra"+i).attr('onclick', '');
	}
	$("button").prop('disabled', true);
	$("#message").html("<p id=\"textoAjuda\"><h3>MUITO BEM! CONCLUIU COM SUCESSO A TAREFA!</h3></p>");
}