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

        $('#insert_cat_div').append('<h4><b>Seleccione</b> ou <b>arraste de uma pasta</b> as imagens para cada categoria. <p><b>IMPORTANTE:</b>Os ficheiros não podem conter caracteres especiais (<>@!#$%^~&*()_+[]{}?:;|\'`´-=) no seu nome!</p></h4>');

        for (var i = 0; i < number_of_categories; i++) {
            $("#insert_cat_div").append('<div id="img' + i + '_div" class="col-sm-3 single_img_div">Categoria: <input name="cat" type="text" id="cat'+i+'"><input type="file" multiple="multiple" id="input' + i + '" class="input" onchange="readURL(this, ' + i + ')" /> </div>');
        }
    });

    $('#save').click(function () {

        var nometemplate = $("#nometemplate").val();

//------------------Erros---------------------
        if (nometemplate == '') {
          alert("Insira um nome para a tarefa!");
          throw new Error("Sem nome para template");
        }else if ($('#insert_cat_div input').val() == '') {
          alert("Insira o nome de todas as categorias!");
          throw new Error("Sem nome para categoria");
        }
//----------------------------------------------
        var tmp;
        //--------------- associar imagens com categorias ---------------
        for (var i = 0; i < number_of_categories; i++) {
            tmp = $('#cat'+i).val();
            for (var j = 0; j < arrayTotal.length; j++) {
              var arrayTmp = arrayTotal[j];
              for (var h = 0; h < arrayTmp.length; h++) {
                if (arrayTmp[arrayTmp.length-1] == i) {
                  arrayTmp.pop();
                  arrayTmp.push(tmp);
                }
              }
            }
        }

        for (var i = 0; i < arrayTotal.length; i++) {
          database.ref('templates/' + nometemplate ).child(arrayTotal[i][arrayTotal[i].length-1]).update(arrayTotal[i].slice(0, arrayTotal[i].length-1))
        }
        database.ref('templates/' + nometemplate).child("tipo").set("categorizacao");



        alert("Tarefa guardada com sucesso!");
        location.reload();
    });
});

var arrayTotal =[];

function readURL(input, i) {

  $('#img' + i + '_div img').remove();
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
    console.log(arrayTotal);


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
