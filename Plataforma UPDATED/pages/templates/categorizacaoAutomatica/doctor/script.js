// References
var database = firebase.database(); // database service
var storageRef = firebase.storage().ref(); // storage service


var number_of_categories;

$(document).ready(function () {

    $('#save').hide();

    $('#generate').click(function () {
        number_of_categories = $("#number_of_categories").val();

        if (number_of_categories == "" || number_of_categories <= 0) {
            alert("Insira um número válido de categorias");
            throw new Error("Número inválido de imagens");
        }

        if ($('#insert_cat_div:has(div)').length > 0) {
            $('#insert_cat_div').html('');
            arrayTotal = [];
        }

        $('#insert_cat_div').append('<h4><b>Seleccione</b> ou <b>arraste uma pasta</b> para cada categoria. <p><b>IMPORTANTE:</b>Os ficheiros dentro da pasta não podem conter caracteres especiais (<>@!#$%^~&*()_+[]{}?:;|\'`´-=) no seu nome!</p></h4>');

        for (var i = 0; i < number_of_categories; i++) {
            $("#insert_cat_div").append('<div id="img' + i + '_div" class="col-sm-3 single_img_div">Categoria: <input name="cat" type="text" disabled="true" id="cat'+i+'"><input type="file" id="file_input'+i+'" webkitdirectory="" directory="" onchange="selectFolder(event, '+i+');readURL(this,'+i+')"></div>');
            //<input type="file" multiple="multiple" id="input' + i + '" class="input" onchange="readURL(this, ' + i + ')" />
        }


    });

    $('#save').click(function () {
        var numImg = $('#numImg').val();
        var nometemplate = $("#nometemplate").val();
        var numTarefa = $("#numTarefa").val();




//------------------Erros---------------------
        if (nometemplate == '') {
          alert("Insira um nome para a tarefa!");
          throw new Error("Sem nome para template");
        }else if (numImg == 0){
          alert("Número de imagens por pasta tem de ser superior a zero!");
          throw new Error("Numero de imagens por pasta é = zero");
        }else if (checkImg(numImg)) {
          alert("Número de imagens por pasta é maior do que os elementos de uma das categorias!");
          throw new Error("Numero de imagens por pasta é > que as que a pasta contem");
        }else if (numTarefa == 0) {
          alert("Expecifique quantas tarefas quer criar!");
          throw new Error("Numero de tarefas nao especificado");
        }




//----------------------------------------------
for (var p = 0; p < numTarefa; p++) {
  //Shuffle and put only X photos
  var arrayTotaltmp = arrayTotal.slice(0);

  for (var i = 0; i < arrayTotaltmp.length; i++) {
    var lastOne = arrayTotaltmp[i][arrayTotaltmp[i].length-1];
    var unique_random_numbers = generateRandomNumber(arrayTotaltmp[i].length-2, numImg);
     var tmpArray =[];


     for(j=0;j< unique_random_numbers.length; j++){
      tmpArray[j] = arrayTotaltmp[i][unique_random_numbers[j]];
      }
      arrayTotaltmp[i] = tmpArray;
      arrayTotaltmp[i].push(lastOne);
  }




  //--------------- associar imagens com categorias ---------------
  var tmp;
  for (var i = 0; i < number_of_categories; i++) {
      tmp = $('#cat'+i).val();
      for (var j = 0; j < arrayTotaltmp.length; j++) {
        var arrayTmp = arrayTotaltmp[j];
        for (var h = 0; h < arrayTmp.length; h++) {
          if (arrayTmp[arrayTmp.length-1] == i) {
            arrayTmp.pop();
            arrayTmp.push(tmp);
          }
        }
      }
  }

  for (var i = 0; i < arrayTotaltmp.length; i++) {
    console.log(arrayTotaltmp);
    database.ref('templates/' + nometemplate + '' + p).child(arrayTotaltmp[i][arrayTotaltmp[i].length-1]).update(arrayTotaltmp[i].slice(0, arrayTotaltmp[i].length-1))
  }
  database.ref('templates/' + nometemplate + '' + p).child("tipo").set("categorizacao");

}




        alert("Tarefas guardadas com sucesso!");
        //location.reload();
    });
});

var arrayTotal =[];
var nrImgPorPasta =[];

function selectFolder(e, i) {
    var theFiles = e.target.files;
    var relativePath = theFiles[0].webkitRelativePath;
    var folder = relativePath.split("/");
    $('#cat'+i).val(folder[0])
}

function readURL(input, i) {

  $('#img' + i + '_div img').remove();
  nrImgPorPasta.push(input.files.length);
  var tmp = 0;
  var arrayImagens = [];
  var reader;
  var path;
  var imageRef;
  var imagesImageRef;
  var specialChars = "<>@!#$%^&*()_+[]{}?:;ãẽĩõũáéíóúàèìòùâêîôû|'\"\\,/~`-=";

  for (var x = 0; x < input.files.length; x++) {
    if (check(input.files[x].name, specialChars) == true) {
      alert("O nome da imagem não pode ter caracteres especiais, por favor renomeie o ficheiro");
      $('#save').hide();
      throw new Error("Caracteres invalidos no titulo da imagem");
    }else{
      if (input.files && input.files[x]) {

          reader = new FileReader();
          path = 'templates/categorizacao/' + input.files[x].name;
          imageRef = storageRef.child(input.files[x].name);
          imagesImageRef = storageRef.child(path);

          reader.onload = function (e) {
              $('#img' + i + '_div').append('<img id="img'+i+'" src="' + e.target.result + '" class="img">');
              }

              var file = input.files[x];
              arrayImagens.push(input.files[x].name);
              imagesImageRef.put(file).then(function () {
                  console.log('Uploaded a blob or file!');
              });
          };
          reader.readAsDataURL(input.files[x]);
      }
    }




    for (var j = 0; j < arrayTotal.length; j++) {
      var arrayTmp = arrayTotal[j];
      for (var h = 0; h < arrayTmp.length; h++) {
        if (arrayTmp[arrayTmp.length-1] == i) {
          arrayTotal.remove(arrayTmp);
        }
      }
    }


    arrayImagens.push(i);
    arrayTotal.push(arrayImagens);


    //_---------------------------------- Verificação para o botao aparecer ------------------------
    if (arrayTotal.length == number_of_categories ) {

      $('#save').show();
    }
    //-----------------------------------------------------------------------------------------------


}

function check(string, chars){
  for(i = 0; i < chars.length;i++){
        if(string.indexOf(chars[i]) > -1){
            return true
        }
    }
    return false;
}

// initialize
function Init() {

    var fileselect = $id("fileselect"),
        filedrag = $id("filedrag"),
        submitbutton = $id("submitbutton");

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

        // remove submit button
        submitbutton.style.display = "none";
    }

}

// getElementById
function $id(id) {
    return document.getElementById(id);
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

function checkImg(nrImg){
  for (var i = 0; i < nrImgPorPasta.length; i++) {
    if (nrImg > nrImgPorPasta[i]) {
      return true;
    }
  }
  return false;
}




function generateRandomNumber(max, numImg){
    unique_random_numbers = [];
  while (unique_random_numbers.length < numImg) {
    var random_number = Math.round(Math.random()*(max));
    if (unique_random_numbers.indexOf(random_number) == -1) {
  // Yay! new random number
          unique_random_numbers.push( random_number );
      }
  }
  return unique_random_numbers;
}
