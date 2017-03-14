

   var input="Joao Quintanilha";		//input dado para adivinhar
   var nrLetras="5";	//nr de letras para esconder
   var arrayLetters = input.split(''); //Array com as letras da palavra
   var letrasEscondidas = []; //arra de letras que estao escondidas
   var mensagensDoDoutor = [];
   var mensagensAjudaRandom = ["Você consegue, tente outra vez!", "Está cada vez mais perto!", "Vai ver que vai acertar na próxima!", "Não desista!"];



$(function () {

        gerarDivs(); //gera divs para palavra a descobrir
        esconderLetras(); //esconde as letras a adivinhar

        //quando botao e clicado
        $(":button").click(function() {
            var clickedButton = this.id;


            //Qando clica butao, verifica se existe e mostra ou nao (para minuscuas  maiusculas)
            if( $.inArray(clickedButton, letrasEscondidas) != -1){
                 for (var i = 0; i < arrayLetters.length; i++) {
                   if ($("#letra"+escondePosicao[i]).html() == clickedButton) {
                      $("#letra"+escondePosicao[i]).hide().fadeToggle(1000).css('background-color', 'white');
                      $("#letra"+escondePosicao[i]).css('visibility', 'visible');
                      $(this).animate({ opacity: 0 });
                      letrasEscondidas.remove(clickedButton);

                    }
                 }
               }
              else if ($.inArray(clickedButton.toUpperCase(), letrasEscondidas) != -1) {
                  for (var i = 0; i < arrayLetters.length; i++) {
                    if ($("#letra"+escondePosicao[i]).html() == clickedButton.toUpperCase()) {
                       $("#letra"+escondePosicao[i]).hide().fadeToggle(1000).css('background-color', 'white');
                       $(this).animate({ opacity: 0 });
                       letrasEscondidas.remove(clickedButton.toUpperCase());

                     }
                  }
              }
              else {  //se a letra do butao nao tiver escondida, tira o butao
                $(this).animate({ opacity: 0 });
                $(this).attr('disabled', true);
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
        } else {
            escondePosicao [i] = tmp;
        }
      }
  }

/* poe background preto para esconder e mete as letras escondidas no array letrasescondidas */
  for (var i = 0; i < escondePosicao.length; i++) {
      letrasEscondidas[i] = $("#letra"+escondePosicao[i]).html();

      $("#letra"+escondePosicao[i]).css('background-color', 'black');

  }
}

/*function que gera divs com as letras das palavras a adivinhar */
function gerarDivs(){
  var count=12;
  for (var i = 0; i < input.length; i++) {
    if (arrayLetters[i] == ' ') {
      for (var x = 0; x < count; x++) {
        $("#inner").append("<div class=\"child col-sm-1 unselectable\" id=\"espaco"+x+"\">&nbsp;</div>");
      }
      count=12;
    }
    else {
      $("#inner").append("<div class=\"child col-sm-1 unselectable\" id=\"letra"+i+"\">"+arrayLetters[i]+"</div>");
      count--;
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
    alert("DONE!");
  }
}
