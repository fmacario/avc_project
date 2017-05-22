// References
var database = firebase.database(); // database service
var storageRef = firebase.storage().ref(); // storage service

// Global variables
var rightAnswers = [];
var pergunta = "";
var botaoTmpEditar = 0;
var answerNumber;
var answers = [];
var respostasTodas = [];


$('#main_div').hide();
$('#main_div').show('slow');
$('#preview').hide();




function getNumberAnswers() {


    answers = [];
    botaoTmpEditar = 0;
    rightAnswers = [];

    answerNumber = $("#sel").val();

    $("#div_respostas").html("").append("<label>Confirme a checkbox para as respostas correctas</label>");

    for (var i = 0; i < answerNumber; i++) {
        $("#div_respostas").append('<div id="answermain' + i + '" class="form-group "> <label class= "col-xs-12"for="usr">Resposta ' + (i + 1) + ' <input id="button' + i + '" type="checkbox" onclick="verificacao(answerNumber' + i + '.id,this.id, answer' + i + '.id)"></label><div class="col-xs-6"><div id="answer' + i + '"><input id="answerNumber' + i + '"type="file" class="form-control" onchange="readURL(this, ' + i + ')"> </div></div></div>');
    }

    $("#div_respostas").append('<div class="col-xs-12" id="butaoGuardar" style="display: none;"><button onclick="generateTemplate()" class="col-xs-2 btn btn-primary btn-outlined" type="button" >Guardar</button></div>');
}

function readURL(input, i) {

  if (answers.includes(input.files[0].name)) {
    alert("A imagem já existe");
    throw new Error("Image already exists");
  }

  answers.remove($('#img'+i).attr("alt"));
  $('#img'+i).remove();

  var tmp = 0;
  var arrayImagens = [];
  var reader;
  var path;
  var imageRef;
  var imagesImageRef;
  var specialChars = "<>@!#$%^&*()_+[]{}?:;ãẽĩõũáéíóúàèìòùâêîôû|'\"\\,/~`-=";


    if (check(input.files[0].name, specialChars) == true) {
      alert("O nome da imagem não pode ter caracteres especiais, por favor renomeie o ficheiro");
      throw new Error("Caracteres invalidos no titulo da imagem");
    }else{


      if (input.files && input.files[0]) {
          answers.push(input.files[0].name);

          reader = new FileReader();
          path = 'templates/reconhecimentovisual/' + input.files[0].name;
          imageRef = storageRef.child(input.files[0].name);
          imagesImageRef = storageRef.child(path);

          reader.onload = function (e) {
              $('#answer'+i).append('<img id="img'+i+'" alt="'+input.files[0].name+'" src="' + e.target.result + '" class="img" style="width: 100%; height:100%">');
              }

              var file = input.files[0];
              arrayImagens.push(input.files[0].name);
              imagesImageRef.put(file).then(function () {
                  console.log('Uploaded a blob or file!');
              });
          };
          //answers.push(input.files[0].name);
          reader.readAsDataURL(input.files[0]);
      }


      if (answers.length == answerNumber) {
        $('#butaoGuardar').show();
      }else {
          $('#butaoGuardar').hide();
      }


  }

function check(string, chars) {
    for (i = 0; i < chars.length; i++) {
        if (string.indexOf(chars[i]) > -1) {
            return true
        }
    }
    return false;
}


function correctAnswer(idResposta, idBotao, idDiv) {

    var resposta = $("#" + idResposta).val();
    resposta = resposta.replace(/^.*[\\\/]/, '')


    //comentado, permite que hajv respostas iguais
    /*if (rightAnswers.includes(resposta)) {
    	  document.getElementById(idBotao).checked = false;
        alert("Esta imagem já existe!");
        throw new error("Equal right answers!")
    }
    else*/ if (resposta == "") {

		document.getElementById(idBotao).checked = false;

		alert("A resposta não pode ser vazia!");
        throw new error("emptty right answer!");
    }
    else{
    	rightAnswers.push(resposta);
	}
  console.log(rightAnswers);
}

function verificacao(idResposta, idBotao, idDiv){



	if (document.getElementById(idBotao).checked) {
		correctAnswer(idResposta, idBotao, idDiv);

		document.getElementById(idResposta).disabled = true;
	}
	else{
		var resposta = $("#" + idResposta).val();
    resposta = resposta.replace(/^.*[\\\/]/, '')
		rightAnswers.remove(resposta);
    console.log(rightAnswers);
		document.getElementById(idResposta).disabled = false;
	}

};

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


function generateTemplate() {

  var nometemplate = $("#nometemplate").val();
  nometemplate = nometemplate.replace(/ /g,"_");
  var pergunta = $("#pergunta").val();

    if (pergunta == "") {
        alert("Insira uma pergunta!");
        throw new Error("question not inserted");
    }else if (nometemplate == "") {
        alert("Insira um nome para o template");
        throw new Error("template name not inserted");
    }

    checkIfNoCorrectAnswer();
    checkIfNotAllRight();

    alert("Template criado com sucesso");
    var nometemplate = $("#nometemplate").val();
    database.ref('templates/' + nometemplate).set({
        pergunta: pergunta,
        respostasCertas: rightAnswers,
        respostas: answers,
        tipo: 'visualrecognition',
        nrEscolhas: answerNumber
    })
    reloadPage();
}



function checkIfNoCorrectAnswer() {
    if (rightAnswers.length == 0) {
        alert("Insira pelo menos uma resposta correta!");
        throw new Error("missing right answer");
    }
}

function checkIfNotAllRight() {
    if (rightAnswers.length == answerNumber) {
        alert("Insira pelo menos uma resposta errada!");
        throw new Error("missing wrong answer");
    }
}

function reloadPage() {
    location.reload();
}

$('#preview').click(function () {
  var pagina = $("#nometemplate").val();
  var refTemplates2 = database.ref('templates/' + pagina);
  refTemplates2.once("value", function (snapshot) {
    console.log(snapshot.val().tipo);
    var paginaespaco = pagina.replace(' ', '_');
    window.location = '../../' + snapshot.val().tipo + '/patient/preview.html' + '?param=' + paginaespaco;
  });
});
