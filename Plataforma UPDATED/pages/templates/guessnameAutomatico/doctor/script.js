
var nrLetras;	//nr de letras para esconder
var messages = []; //array de messages dadas
var wordsToGuess;
var imagesWithExtension;
var specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,/~`-=";


// References
var database = firebase.database(); // database service
var storageRef = firebase.storage().ref(); // storage service

$(function () {
    $('#main_div').hide();
    $('#main_div').show('slow');

    //Submit button
    $('#submitBtn').on('click', function () {
        nrLetras = $('#nrletras').val();		//nrLetras é o nr de letras a esconder

        if (checkNrLetrasBiggerThanWords(nrLetras)) {
            alert("Número de letras a esconder é superior ao número de letras na palavra!");
            throw new Error("Assertion failed");
        }
        else if (nrLetras <= 0) {
            alert("Número de letras não pode ser menor ou igual a 0!");
            throw new Error("Assertion failed");
        }
        /*else if (hasNumbers(input) || check(input, specialChars)) {
          alert("Palavra a descobrir não pode conter números nem caracteres especiais");
          throw new Error("Assertion failed");
        }*/
        else {
            var nometemplate = $("#nometemplate").val();

            if (nometemplate == '') {
              alert("Insira um nome para a tarefa!");
              throw new Error("Sem nome para template");
            }else{

                for (var i = 0; i < imagesWithExtension.length; i++) {
                  var path='templates/'+imagesWithExtension[i];
                  var imageRef = storageRef.child(imagesWithExtension[i]);
                  var imagesImageRef = storageRef.child(path);

                  // While the file names are the same, the references point to different files
                  imageRef.name === imagesImageRef.name            // true
                  imageRef.fullPath === imagesImageRef.fullPath    // false

                  var file = document.getElementById('result').files[0];
                  imagesImageRef.put(file).then(function(snapshot) {
                      console.log('Uploaded a blob or file!');
                  });


                    database.ref('templates/' + nometemplate + i).set({
                        input: wordsToGuess[i],
                        nrLetras: nrLetras,
                        mensagens: messages,
                        tipo: 'guessname',
                        imgname: imagesWithExtension[i]
                    });

                }

          }
        }
        alert("Templates criados com sucesso");
        location.reload();

    });

});

function readURL(input){
  var tmp = 0;
  var pToShow = "";
  var arrayImagens = [];
  var reader;
  var path;
  var imageRef;
  var imagesImageRef;
  var specialChars = "<>@!#$%^&*()_+[]{}?:;ãẽĩõũáéíóúàèìòùâêîôû|'\"\\,/~`-=";
  wordsToGuess = []
  imagesWithExtension = []

  $('#myImg').html("");
  $('#palavras').val("");

  for (var x = 0; x < input.files.length; x++) {
    if (check(input.files[x].name, specialChars) == true) {
      alert("O nome da imagem não pode ter caracteres especiais, por favor renomeie o ficheiro");
      $('#save').hide();
      throw new Error("Caracteres invalidos no titulo da imagem");
    }else{
      if (input.files && input.files[x]) {

          reader = new FileReader();
          path = 'templates/guessnameAutomatico/' + input.files[x].name;
          imageRef = storageRef.child(input.files[x].name);
          imagesImageRef = storageRef.child(path);
          pToShow = $('#palavras').val();
          $('#palavras').val(pToShow + takeExtension(input.files[x].name) + '; ');

          wordsToGuess.push(takeExtension(input.files[x].name));
          imagesWithExtension.push(input.files[x].name);

          reader.onload = function (e) {
              $('#myImg').append('<img id="img'+ tmp++ +'" src="' + e.target.result + '" class="img">');

              }

              var file = input.files[x];
              imagesImageRef.put(file).then(function () {
                  console.log('Uploaded a blob or file!');
              });
          };
          reader.readAsDataURL(input.files[x]);
      }
    }


}


//Get name without extentions
function takeExtension(e) {
    parts = e.split("."); // This is not an answer for all the scnarios, like if file name is `services.controller.js`
    e = parts[0];
    return e;
}

//Assert image was placed
function assertImgInsert() {
    if (imgTitle == null) {
        alert("Insira imagem!");
        throw new Error("Image not inserted");
    }	//se não houver imagem, erro
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
}

// initialize
/*function Init() {

    var fileselect = $id("result"),
        filedrag = $id("filedrag");

    // file select
    fileselect.addEventListener("change", FileSelectHandler, false);

    // is XHR2 available?
    var xhr = new XMLHttpRequest();
    if (xhr.upload) {

        // file drop
        filedrag.addEventListener("dragover", FileDragHover, false);
        filedrag.addEventListener("dragleave", FileDragHover, false);
        filedrag.addEventListener("drop", FileSelectHandler, false);
        filedrag.style.display = "block";

    }

}

// getElementById
function $id(id) {
    return document.getElementById(id);
}*/


function check(string, chars){
  for(i = 0; i < chars.length;i++){
        if(string.indexOf(chars[i]) > -1){
            return true
        }
    }
    return false;
}

function hasNumbers(str){
  return /\d/.test(str);
}

function checkNrLetrasBiggerThanWords(letras){
    for (var i = 0; i < wordsToGuess.length; i++) {
      if (letras > wordsToGuess[i].length) {
        return true;
      }
    }
    return false;
}
