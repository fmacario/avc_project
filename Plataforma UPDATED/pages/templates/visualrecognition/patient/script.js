// References
var database = firebase.database(); // database service
var storageRef = firebase.storage().ref(); // storage service


// Global variables
var myParam = location.search.split('param=')[1]
myParamSpace = myParam.replace('_', ' ');
var templatesRef = database.ref("templates/" + myParamSpace); // database templates
var historico = [];
var images= [];

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
        answerNumber = snapshot.val().nrEscolhas

        for (var i = 0; i < answerNumber; i++) {
            // read images
            storageRef.child('templates/reconhecimentovisual/' + answers[i]).getDownloadURL().then(function (url) {
                images.push(url);

                if(images.length == answerNumber){

                    start();
                }
            });
        }

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
        document.getElementById('rect').style.visibility = 'hidden';
    }

    inserirPergunta(); //gera pergunta
    shuffle(answers); // shuffles the array
    orderAnswersAndImgs();
    generateBtn(); //gera divs para palavra a descobrir

    $(":button").click(function () {
        var clickedButton = this.id;
        var chosenAnswer = document.getElementById(clickedButton).id;


        if (rightAnswers.includes(chosenAnswer)) {
            $(this).parent().css('background-color', 'LightGreen');
            $(this).attr('disabled', 'disabled');

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

  //ORDENARD O images DE ACORDO COM O ANSWERS
function orderAnswersAndImgs(){


          var answersWithChars = answers.slice(0);
          for (var i = 0; i < answersWithChars.length; i++) {
            answersWithChars[i] = answersWithChars[i].split(' ').join('%20');
          }

          //console.log(answers);
          //console.log(answersWithChars);
          //console.log(images);

          var tmpArray = [];

          for (var i = 0; i < answers.length; i++) {
            for (var j = 0; j < images.length; j++) {
              if (images[j].indexOf(answers[i]) !== -1 || images[j].indexOf(answersWithChars[i]) !== -1) {
                  //console.log(images[j] + " contem " + answers[i]);
                  tmpArray[i] = images[j];
              }

            }
          }

          images = tmpArray;

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

  var orilength = answerNumber;

  var col; //height;

  if (orilength >= 5) {
      //height = 50;
      col = parseInt(12 / orilength) + 1;
  }
  else {
      col = 12 / orilength;
      //height = 100;
  }

    for (var i = 0; i < orilength; i++) {
        $("#answers").append('<div id="button' + i + '" class="col-sm-' + col + ' single_img_div"></div>')
    }

    for (var i = 0; i < orilength; i++) {
        $("#button"+i).append("<button class=\" btn\" id=\""+ answers[i] +"\" style=\"background: url("+images[i]+"); background-repeat: no-repeat; background-position: 50% 50%;\"></button>");
    }
}


function clock() {

    //console.log(timer);
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

function checkIfDone() {
    if (rightAnswers.length == 0) {
        clearInterval(timer);

        var n = min + "." + sec + "." + msec;
        console.log(n);

        tentativasResposta++;
        respostasCorretas++;

        database.ref('patients/' + username).once("value", function (snapshot) {
            var finalTemplates = snapshot.child("ptemplates").val();
            var pprocess = snapshot.child("pprocess").val();
            var finalTemplatesDone = jQuery.makeArray(snapshot.child("ptemplatesdone").val());
            finalTemplatesDone.push(myParamSpace);

            database.ref('patients/' + username).once("value", function (snapshot) {
                database.ref('patients/' + username + '/ptemplatesdone/' + myParamSpace).set({
                    templatename: myParamSpace,
                    pergunta: question,
                    respostasCertas: rightAnswers,
                    respostas: answers,
                    nrEscolhas: answerNumber,
                    tempo: n,
                    attempts: tentativasResposta
                });
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
    $("#" + clickedButton).attr('background', 'green');
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
