

   var selectedDiv;
   var input;		//input dado para adivinhar
   var nrLetras;	//nr de letras para esconder
   var arrayLetters; //Array com as letras da palavra
   var letrasEscondidas = []; //arra de letras que estao escondidas
   var mensagensDoDoutor = []; //Mensgens de ajuda dadas pelo doutor
   var mensagensAjudaRandom = ["Você consegue, tente outra vez!", "Está cada vez mais perto!", "Vai ver que vai acertar na próxima!", "Não desista!"]; //mensagens de ajuda pre definidas



$(function () {

        // GERAR TEMPLATE EM SERVIDOR
        /*
        $.getJSON('Joao Pedro Quintanilha_5letras_escondidas.json', function(data) {
            input = data[Object.keys(data)[0]];
            nrLetras = data[Object.keys(data)[1]];
            mensagensDoDoutor = data[Object.keys(data)[3]];
            arrayLetters = input.split('');

                    gerarDivs(); //gera divs para palavra a descobrir
                    esconderLetras(); //esconde as letras a adivinhar
        });

        */

        // GERAR TEMPLATE EM SERVIDOR loclmente
        input = "Joao Quintanilha";
        nrLetras = 5;
        arrayLetters = input.split('');

        gerarDivs(); //gera divs para palavra a descobrir
        esconderLetras(); //esconde as letras a adivinhar


        //quando botao e clicado
        $(":button").click(function() {
            var clickedButton = this.id;
            var selectedLetter = $("#"+selectedDiv).html();

            checkIfDivSelected();

            if (selectedLetter == clickedButton || selectedLetter == clickedButton.toUpperCase()) {
              $("#"+selectedDiv).hide().fadeToggle(1000).attr('class', 'child col-sm-1 unselectable');
              $("#"+selectedDiv).attr('onclick', '');
              selectedDiv = null;
              letrasEscondidas.remove(clickedButton);
              letrasEscondidas.remove(clickedButton.toUpperCase());
            }
            else {
              if (mensagensDoDoutor.length != 0) {  //usa mensagens dadas pela doutora se ela tiver dado
                $("#message").html("<p id=\"textoAjuda\">"+mensagensDoDoutor[Math.floor(Math.random() * (mensagensDoDoutor.length))]+"</p>");
              }
              else {  //usa mensagens de ajuda predefinidas
                $("#message").html("<p id=\"textoAjuda\">"+mensagensAjudaRandom[Math.floor(Math.random() * (mensagensAjudaRandom.length))]+"</p>");
              }

              $("#textoAjuda").delay(3000).fadeOut(1000);
            }

              checkIfDone();
          });
});

/* function que esconde os caracteres */
function esconderLetras(){

  escondePosicao = [];        // posicao das letras a serem escondidas

/* nao deixa a posicao de esconder ser a mesma */
  for (var i = 0; i < nrLetras; i++) {
      var tmp = Math.floor(Math.random() * (input.length));

      while (arrayLetters[tmp] == " ") {                  //previne que a letra a ser escondida seja um espaco
         tmp = Math.floor(Math.random() * (input.length));
      }

      if (escondePosicao.length == 0) {                 //se array tiver limpo, poe
          escondePosicao [i] = tmp;
      }else {                                             //previne repeticao dentro do array
          if( $.inArray(tmp, escondePosicao) != -1){
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
      letrasEscondidas[i] = $("#letra"+escondePosicao[i]).html();
      $("#letra"+escondePosicao[i]).attr('class', 'child col-sm-1 unselectable hided-div');
      $("#letra"+escondePosicao[i]).attr('onclick', 'getSelectedDiv(id)');
  }
}

/*function que gera divs com as letras das palavras a adivinhar */
function gerarDivs(){
  for (var i = 0; i < input.length; i++) {
    if (arrayLetters[i] == ' ') {
        $("#inner").append("<div  class=\"row unselectable\" id=\"espaco"+x+"\">&nbsp;</div>");
    }
    else {
      $("#inner").append("<div  class=\"child col-sm-1 unselectable\" id=\"letra"+i+"\">"+arrayLetters[i]+"</div>");
    }
  }
}

/* Removes element from array by value*/
Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

function checkIfDone(){
  if (letrasEscondidas.length == 0) {
    $("#message").html("<p id=\"textoAjuda\"><h3>MUITO BEM! CONCLUIO COM SUCESSO A TAREFA!</h3></p>");
    $("button").prop('disabled', true);
  }
}

function getSelectedDiv(div){
  if (selectedDiv == null) {
    selectedDiv = div;
    $("#"+selectedDiv).attr("class", "child col-sm-1 unselectable hided-selected-div");
  }
  else {
    unselectLastDiv(selectedDiv);
    selectedDiv = div;
    $("#"+selectedDiv).attr("class", "child col-sm-1 unselectable hided-selected-div");
  }

}

function unselectLastDiv(div){
  $("#"+div).attr("class", "child col-sm-1 unselectable hided-div");
}

function checkIfDivSelected(){
  if (selectedDiv == null) {
    $("#message").html("<p id=\"textoAjuda\">Seleccione um espaço preto para adivinhar a letra!</p>");
    $("#textoAjuda").delay(2000).fadeOut(1000);
    throw new Error("No black area selected");
  }
}


/*
var recognizing;
var final;
var interim;
//var recognition = new webkitSpeechRecognition();
var recognition = new window.SpeechRecognition();
recognition.continuous = true;
recognition.interim = true;
reset();
recognition.onend = reset;
recognition.lang = "pt-PT";

recognition.onresult = function (event) {
  final = "";
  interim = "";
  for (var i = 0; i < event.results.length; ++i) {
    if (event.results[i].final) {
        final += event.results[i][0].transcript;
    } else {
        interim += event.results[i][0].transcript;
        if (input == event.results[i][0].transcript) {
          console.log("RESPOSTA CERTA")
        } 
        console.log("resp " + event.results[i][0].transcript);
    }
  }
  final_span.innerHTML = final;
  interim_span.innerHTML = interim;
}

function reset() {
  recognizing = false;
  buttonss.innerHTML = "Click to Speak";
}

function toggleStartStop() {

    recognition.start();
    recognizing = true;
    buttonss.innerHTML = "Click to Stop";
    final_span.innerHTML = "";
    interim_span.innerHTML = "";
    */
}
