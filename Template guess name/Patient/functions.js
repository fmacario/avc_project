

   var input="Bruno Henri ques";		//input dado para adivinhar
   var nrLetras="2";	//nr de letras para esconder
   var arrayLetters = input.split(''); //Array com as letras da palavra
   var letrasEscondidas = []; //arra de letras que estao escondidas


$(function () {

        gerarDivs();
        esconderLetras();


        //Qando clica butao, verifica se existe e mostra ou nao
        $(":button").click(function() {
            var clickedButton = this.id;
            if( $.inArray(clickedButton, letrasEscondidas) != -1){
                 for (var i = 0; i < arrayLetters.length; i++) {
                   if ($("#letra"+escondePosicao[i]).html() == clickedButton) {
                      $("#letra"+escondePosicao[i]).hide().fadeToggle(1000).css('background-color', 'white');
                      $(this).animate({ opacity: 0 });
                      letrasEscondidas.remove(clickedButton);
                    }
                 }
               }
              if ($.inArray(clickedButton.toUpperCase(), letrasEscondidas) != -1) {
                  for (var i = 0; i < arrayLetters.length; i++) {
                    if ($("#letra"+escondePosicao[i]).html() == clickedButton.toUpperCase()) {
                       $("#letra"+escondePosicao[i]).hide().fadeToggle(1000).css('background-color', 'white');
                       $(this).animate({ opacity: 0 });
                       letrasEscondidas.remove(clickedButton.toUpperCase());
                     }
                  }
              }
              else {
                $(this).animate({ opacity: 0 });
                $(this).attr('disabled', true);
              }
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
        $("#inner").append("<div class=\"child col-sm-1\" id=\"espaco"+x+"\">&nbsp;</div>");
      }
      count=12;
    }
    else {
      $("#inner").append("<div class=\"child col-sm-1\" id=\"letra"+i+"\">"+arrayLetters[i]+"</div>");
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
    console.log("DONE!");
  }
}
