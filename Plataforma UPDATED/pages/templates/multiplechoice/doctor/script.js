// Initialize Firebase
var config = {
    apiKey: "AIzaSyCWjs-R7KWD1Hqg1Ve4h1ZGynj06XbB-JQ",
    authDomain: "avcproject-fae11.firebaseapp.com",
    databaseURL: "https://avcproject-fae11.firebaseio.com",
    storageBucket: "avcproject-fae11.appspot.com",
    messagingSenderId: "1031859806052"
};

firebase.initializeApp(config);

// References
var database = firebase.database(); // database service

// Global variables
var rightAnswers = [];
var pergunta = "";
var botaoTmpEditar = 0;
var answerNumber;
var answers = [];


function getQuestion() {
    pergunta = $("#pergunta").val();
}

function getNumberAnswers() {

    answers = [];
    botaoTmpEditar = 0;
    rightAnswers = [];

    answerNumber = $("#sel").val();

    $("#div_respostas").html("");

    for (var i = 0; i < answerNumber; i++) {
        $("#div_respostas").append('<div id="answer' + i + '" class="form-group "> <label class= "col-xs-12"for="usr">Resposta ' + (i + 1) + '</label><div class="col-xs-6"><input id="answerNumber' + i + '"type="text" class="form-control" > </div><label><input id="button' + i + '" type="checkbox" onclick="verificacao(answerNumber' + i + '.id,this.id, answer' + i + '.id)"></label> </div>');
    }

    $("#div_respostas").append('<div class="col-xs-12" id="butaoGuardar"><button onclick="generateTemplate()" class="col-xs-2 btn btn-primary btn-outlined" type="button" >Guardar</button></div>');
}


function correctAnswer(idResposta, idBotao, idDiv) {

    var resposta = $("#" + idResposta).val();

    if (rightAnswers.includes(resposta)) {
    	document.getElementById(idBotao).checked = false; 
        alert("A resposta já existe!");
        throw new error("Equal rightAnswers!")
    }
    else if (resposta == "") {

        console.log(idResposta);

		document.getElementById(idBotao).checked = false; 

		alert("A resposta não pode ser vazia!");
        throw new error("emptty right answer!");
    }
    else{
    	rightAnswers.push(resposta);
	}
}

function verificacao(idResposta, idBotao, idDiv){
	console.log(rightAnswers);
	if (document.getElementById(idBotao).checked) {
		correctAnswer(idResposta, idBotao, idDiv);

		document.getElementById(idResposta).disabled = true;
	}
	else{
		var resposta = $("#" + idResposta).val();
		rightAnswers.remove(resposta);
		document.getElementById(idResposta).disabled = false;
	}
	console.log(rightAnswers);
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
    if (pergunta == "") {
        alert("Insira uma pergunta!");
        throw new Error("question not inserted");
    }

    for (var i = 0; i < answerNumber; i++) {
        var tmp = $("#answerNumber" + i).val();
        answers.push(tmp);
    }

    checkIfAnswerMissig();
    checkIfNoCorrectAnswer();
    checkIfNotAllRight();

    alert("Template criado com sucesso");

    database.ref('templates/multiplechoice/' + 0).set({
        pergunta: pergunta,
        respostasCertas: rightAnswers,
        respostas: answers,
        nrEscolhas: answerNumber
    })
}

function checkIfAnswerMissig() {
    if (answers.includes("")) {
        answers = [];
        alert("Insira todas as respostas possíveis!");
        throw new Error("missing answer");
    }
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
