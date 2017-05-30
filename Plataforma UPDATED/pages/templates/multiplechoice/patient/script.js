// References
var database = firebase.database(); // database service

// Global variables
var myParam = location.search.split('param=')[1]
var templatesRef = database.ref("templates/" + myParam); // database templates
var historico = [];
//Time variables

var timer = setInterval(clock, 10);
var msec = 00;
var sec = 00;
var min = 00;

//estatitics variables
var tentativasResposta = 0;
var respostasCorretas = 0;
var respostasErradas = 0;
var username;

templatesRef.once("value", function (snapshot) {
    rightAnswers = snapshot.val().respostasCertas,
        question = snapshot.val().pergunta,
        answers = snapshot.val().respostas,
        answerNumber = snapshot.val().nrEscolhas,
        templateType = snapshot.val().tipo
    start();
});

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        username = (user.email).split('@')[0];
    } else {
        // No user is signed in.
    }
});


function start() {
    $(".loader").hide('slow');
    $("#jogo").show('slow');

    window.SpeechRecognition = window.SpeechRecognition ||
        window.webkitSpeechRecognition ||
        null;

    //caso não suporte esta API DE VOZ                              
    if (window.SpeechRecognition != null) {
        document.getElementById('rect').style.visibility = 'visible';
    }

    inserirPergunta(); //gera pergunta
    shuffle(answers); // shuffles the array
    generateBtn(); //gera divs para palavra a descobrir

    $(":button").click(function () {

        var clickedButton = this.id;
        var chosenAnswer = $("#" + clickedButton).html();

        console.log(clickedButton);

        if (rightAnswers.includes(chosenAnswer)) {
            disableBtn(clickedButton);
            $("#" + clickedButton).attr('class', 'answer btn btn-success');
            // $("#" + clickedButton).delay(1000).fadeOut(1000); // para o botão desaparecer, depois de clicado

            rightAnswers.remove(chosenAnswer);
            historico.push(chosenAnswer);
            checkIfDone();
        }
        else if (clickedButton == "rect") {
            try {
                recognizer.start();
            } catch (ex) {
                alert("error: " + ex.message);
            }
            document.getElementById('divBorder').style.visibility = 'visible';
            document.getElementById('rect').style.visibility = 'hidden';
        }
        else if (!historico.includes(chosenAnswer)) {
            //disableBtn(clickedButton); ("#textoAjuda").delay(3000).fadeOut(1000);
            $("#" + clickedButton).attr('class', 'answer btn btn-danger');

            setTimeout(function () {
                removerCorVermelha(clickedButton);
            }, 1000);
        }
    });

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


function inserirPergunta() {
    $("#question").html(question);
}

function generateBtn() {
    for (var i = 0; i < answerNumber; i++) {
        $("#answers").append("<button class=\"answer btn btn-outlined\" id=\"resposta" + i + "\">" + answers[i] + "</button>");
    }
}


function checkIfDone() {
    if (rightAnswers.length == 0) {
        clearInterval(timer);
        var n = min + "." + sec;

        tentativasResposta++;
        respostasCorretas++;

        database.ref('patients/' + username).once("value", function (snapshot) {
            database.ref('patients/' + username).set({
                ntemplates: snapshot.val().ntemplates,
                ntemplatesdone: snapshot.child("ptemplatesdone").numChildren() + 1,
                pname: snapshot.val().pname,
                pprocess: snapshot.val().pprocess,
                ptemplates: snapshot.val().ptemplates,
                ptemplatesdone: snapshot.child("ptemplatesdone").val()
            });

            database.ref('patients/' + username + '/ptemplatesdone' + '/multiplechoice/' + myParam).set({
                templatename: myParam,
                pergunta: question,
                respostasCertas: rightAnswers,
                respostas: answers,
                nrEscolhas: answerNumber,
                tempo: n,
                attempts: tentativasResposta,
                tipotemplate: templateType,
            });
        });


        recognizer.stop();
        $("#message").append("<h2>MUITO BEM! CONCLUIU A TAREFA COM SUCESSO!</h2>");

        for (var i = 0; i < answerNumber; i++) {
            $("#resposta" + i).attr('disabled', 'disabled');
        }
        document.getElementById('rect').style.visibility = 'hidden';
    }
}

function disableBtn(clickedButton) {
    $("#" + clickedButton).attr('disabled', 'disabled');
    $("#" + clickedButton).removeAttr('class');
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

/*Shuffles array*/
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

function voz(botao_escolhido) {

    var clickedButton = botao_escolhido.id;
    var chosenAnswer = $("#" + clickedButton).html();

    console.log("botao " + botao_escolhido.id);
    console.log("chosenAnswer: " + chosenAnswer);

    console.log(rightAnswers);
    console.log(historico);
    if (rightAnswers.includes(chosenAnswer)) {
        console.log("certa");

        disableBtn(clickedButton);
        $("#" + clickedButton).attr('class', 'answer btn btn-success');

        rightAnswers.remove(chosenAnswer);
        historico.push(chosenAnswer);
        checkIfDone();
    }
    else if (!historico.includes(chosenAnswer)) {
        console.log("errada");

        $("#" + clickedButton).attr('class', 'answer btn btn-danger');

        setTimeout(function () {
            removerCorVermelha(clickedButton);
        }, 1000);
    }
}

function getNoRespostas() {
    return answerNumber;
}

function removerCorVermelha(clickedButton) {
    respostasErradas++;
    tentativasResposta++;
    $("#" + clickedButton).attr('class', 'answer btn btn-outlined');
}