// References
var storageRef = firebase.storage().ref(); // storage service
var database = firebase.database(); // database service

// read metadata
var input;
var nrLetters;
var myParam = location.search.split('param=')[1]
var templatesRef = database.ref("templates/" + myParam); // database templates
var selectedDiv = null;
var letrasEscondidas = [];
var arrayLetters = [];
var imgTitle;

//statistics variables

var timer = setInterval(clock, 10);
var msec = 00;
var sec = 00;
var min = 00;
var totalAttemps = 0;
var letrasEscondidasEstatitiscas = [];
var username;
var attemps = [];
var letrasClicadas = [];


firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        username = (user.email).split('@')[0];
    } else {
        // No user is signed in.
    }
});


templatesRef.once("value", function (snapshot) {
    imgTitle = snapshot.val().imgname;
    input = snapshot.val().input;
    nrLetras = snapshot.val().nrLetras;
    mensagensDoDoutor = snapshot.val().mensagens;
    templateType = snapshot.val().tipo

    if (doesntContainNum(input)) {
        $('#buttonsNumbers').hide();
    }

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
            escondePosicao[i] = tmp;
        } else {                                             //previne repeticao dentro do array
            if ($.inArray(tmp, escondePosicao) != -1) {
                i--;
            }
            else {
                escondePosicao[i] = tmp;
            }
        }
    }

    /* poe background preto para esconder e mete as letras escondidas no array letrasescondidas */
    /* atribui ás letras escondidas a chance de serem clicadas */
    for (var i = 0; i < escondePosicao.length; i++) {
        letrasEscondidas[i] = $("#letra" + escondePosicao[i]).html();
        //array para letras escondidas estatisticas
        letrasEscondidasEstatitiscas[i] = $("#letra" + escondePosicao[i]).html();

        $("#letra" + escondePosicao[i]).attr('class', 'child col-sm-1 unselectable hided-div');
        $("#letra" + escondePosicao[i]).attr('onclick', 'getSelectedDiv(id)');
    }


    $("#message").html("<p id=\"textoAjuda\">Seleccione um bloco preto para adivinhar a letra!</p>");

    // read image
    var spaceRef = storageRef.child('templates/' + imgTitle);
    var path = spaceRef.fullPath;

    storageRef.child('templates/' + imgTitle).getDownloadURL().then(function (url) {
        var test = url;
        document.querySelector('#imgid').src = test;
        $(".loader").hide('slow');
        $("#jogo").show('slow');//css("display", "block");
    }).catch(function (error) {

    });
});

// acaba read image

//quando botao e clicado
$(":button").click(function () {
    var clickedButton = this.id;
    var selectedLetter = $("#" + selectedDiv).html();

    checkIfDivSelected();

    var certo = false;

    if (true) {
        if (selectedLetter == clickedButton || selectedLetter == clickedButton.toUpperCase()) {
            certo = true;
        }

        if (clickedButton == 'a' || clickedButton == 'A') {
            if (selectedLetter == 'ã' || selectedLetter == 'Ã' || selectedLetter == 'á' || selectedLetter == 'Á')
                certo = true;
        }
        else if (clickedButton == 'o' || clickedButton == 'O') {
            if (selectedLetter == 'õ' || selectedLetter == 'Õ' || selectedLetter == 'ó' || selectedLetter == 'Ó')
                certo = true;
        }
        else if (clickedButton == 'i' || clickedButton == 'I') {
            if (selectedLetter == 'í' || selectedLetter == 'Í')
                certo = true;
        }
        else if (clickedButton == 'e' || clickedButton == 'E') {
            if (selectedLetter == 'é' || selectedLetter == 'É')
                certo = true;
        }
        else if (clickedButton == 'u' || clickedButton == 'U') {
            if (selectedLetter == 'ú' || selectedLetter == 'Ú')
                certo = true;
        }
    }

    letrasClicadas.push(clickedButton.toUpperCase());
    console.log(clickedButton.toUpperCase());

    if (certo) {
        $("#" + selectedDiv).hide().fadeToggle(1000).attr('class', 'child col-sm-1 unselectable');
        $("#" + selectedDiv).attr('onclick', '');
        selectedDiv = null;
        letrasEscondidas.remove(clickedButton);
        letrasEscondidas.remove(clickedButton.toUpperCase());
        $("#message").html("MUITO BEM!  <p>  Seleccione outro bloco preto para adivinhar a letra! </p>");
        console.log(totalAttemps);
        attemps.push(totalAttemps);
        totalAttemps = 0;
        //console.log(attemps);



    }
    else {
        if (mensagensDoDoutor.length != 0) {  //usa messages dadas pela doutora se ela tiver dado
            $("#message").html("<p id=\"textoAjuda\">" + mensagensDoDoutor[Math.floor(Math.random() * (mensagensDoDoutor.length))] + "</p>");
        }
        else {  //usa messages de ajuda predefinidas
            $("#message").html("<p id=\"textoAjuda\">" + mensagensAjudaRandom[Math.floor(Math.random() * (mensagensAjudaRandom.length))] + "</p>");
        }

        totalAttemps++;
        console.log(totalAttemps);
        console.log(attemps);
        //$("#textoAjuda").delay(3000).fadeOut(1000);
    }

    checkIfDone();
});



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
        clearInterval(timer);
        var n = min + "." + sec

        $("#message").html("<p id=\"textoAjuda\"><h3>MUITO BEM! CONCLUIU COM SUCESSO A TAREFA!</h3></p>");
        $("button").prop('disabled', true);

        /*        database.ref('patients/' + selectedPatient + "/ptemplates").once("value", function (snapshot) {
                    console.log(snapshot.val());
                });*/

        database.ref('patients/' + username).once("value", function (snapshot) {
            database.ref('patients/' + username).set({
                ntemplates: snapshot.val().ntemplates,
                ntemplatesdone: snapshot.child("ptemplatesdone").numChildren()+1,
                pname: snapshot.val().pname,
                pprocess: snapshot.val().pprocess,
                ptemplates: snapshot.val().ptemplates,
                ptemplatesdone: snapshot.child("ptemplatesdone").val()
            });

            database.ref('patients/' + username + '/ptemplatesdone/guessname' + myParam).set({
                templatename: myParam,
                tipotemplate: templateType,
                escondidas: letrasEscondidasEstatitiscas,
                tentativas: attemps,
                palavra: input,
                clicadas: letrasClicadas,
            });
        });
    }
}

function getSelectedDiv(div) {
    if (selectedDiv == null) {
        selectedDiv = div;
        $("#" + selectedDiv).attr("class", "child col-sm-1 unselectable hided-selected-div");
        $("#message").html("Seleccione a letra para o respetivo bloco.");
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
        throw new Error("No black area selected");
    }
}

function end() {
    for (var i = 0; i < arrayLetters.length; i++) {
        $("#letra" + i).hide().fadeToggle(1000).attr('class', 'child col-sm-1 unselectable');
        $("#letra" + i).attr('onclick', '');
    }
    $("button").prop('disabled', true);
    $("#message").html("<p id=\"textoAjuda\"><h3>MUITO BEM! CONCLUIU COM SUCESSO A TAREFA!</h3></p>");
}

function doesntContainNum(string) {
    return !/\d/.test(string);
}

function clock() {

    msec += 1;
    if (msec == 100) {
        sec += 1;
        msec = 00;
        if (sec == 60) {
            sec = 00;
            min += 1;

        }
    }
    //console.log(min + ":" + sec + ":" + msec);
}


