    var rightAnswers = [];
    var pergunta="";
    var botaoTmpEditar=0;
    var answerNumber;
    var answers = [];


   	function getQuestion(){
       	pergunta = $("#pergunta").val();
    }

    function getNumberAnswers(){

    answers = [];
    botaoTmpEditar=0;
    rightAnswers = [];

		answerNumber = $("#sel").val();

		$("#div_respostas").html("");

		for(var i = 0; i < answerNumber; i++){
			$("#div_respostas").append('<div id="answer'+i+'" class="form-group "> <label class= "col-xs-12"for="usr">Resposta '+ (i+1) + '</label><div class="col-xs-6"><input id="answerNumber'+i+'"type="text" class="form-control" > </div><label><button class="btn btn-primary btn-outlined" id="button'+ i + '" type="button" onclick="correctAnswer(answerNumber'+i+'.id,this.id, answer'+i+'.id)">Correta</button></label> </div>');
	   	}

	   	$("#div_respostas").append('<div class="col-xs-12" id="butaoGuardar"><button onclick="generateTemplate()" class="col-xs-2 btn btn-primary btn-outlined" type="button" >Guardar</button></div>');
	}



  function correctAnswer(idResposta, idBotao, idDiv){

    var resposta = $("#"+idResposta).val();

    if (rightAnswers.includes(resposta)) {
      alert("A resposta já existe!");throw new error("Equal rightAnswers!")
    }
    else if (resposta == "") {
      alert("A resposta não pode ser vazia!");throw new error("emptty right answer!")
    }

    var botao = $("#"+idBotao).attr('disabled','disabled');
    $("#"+idResposta).attr('readonly', 'readonly');
    $("#"+idDiv).append('<label><button id="meuid'+botaoTmpEditar+'" class="btn btn-primary btn-outlined" type="button" onclick="editAnswer('+idResposta+'.id, '+idBotao+'.id, '+idDiv+'.id, this.id)">Editar</button></label>');
    botaoTmpEditar++;
    rightAnswers.push(resposta);
}

function editAnswer(idResposta, idBotao, idDiv, meuID){
      var tmp = $("#"+idResposta).val();
      rightAnswers.remove(tmp);
      $("#"+idResposta).removeAttr('readonly');
      $("#"+idBotao).removeAttr('disabled');
      $("#"+meuID).remove();
      botaoTmpEditar--;


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


function generateTemplate(){



  if (pergunta == "") {
    alert("Insira uma pergunta!"); throw new Error("question not inserted");
  }

  for (var i = 0; i < answerNumber; i++) {
      var tmp = $("#answerNumber"+i).val();
      answers.push(tmp);
  }

  checkIfAnswerMissig();
  checkIfNoCorrectAnswer();
  checkIfNotAllRight();

  var myObject = new Object();
  myObject.pergunta = pergunta;
  myObject.respostasCertas = rightAnswers;
  myObject.respostas = answers;
  myObject.nrEscolhas = answerNumber;

  var myString = JSON.stringify(myObject);
  console.log(myString);

  answers =[];

  $("#reloadPage").remove();
  $("#butaoGuardar").append('<button id="reloadPage" onclick="reloadPage()" class="col-xs-2 btn btn-primary btn-outlined" type="button" style="margin-left:5px;">Apagar tudo</button>');


}

function checkIfAnswerMissig(){
  if (answers.includes("")) {
    answers = [];
    alert("Insira todas as respostas possiveis!"); throw new Error("missing answer");
  }
}

function   checkIfNoCorrectAnswer(){
  if (rightAnswers.length == 0) {
    alert("Insira pelo menos uma resposta correcta!"); throw new Error("missing right answer");
  }
}

function   checkIfNotAllRight(){
  if (rightAnswers.length == answerNumber) {
    alert("Insira pelo menos uma resposta errada!"); throw new Error("missing wrong answer");
  }
}

function reloadPage(){
  location.reload();
}
