	function start(){
		var i;
		var answers = [];
		console.log(localStorage);
		//var pergunta = localStorage.getItem("pergunta");
		$("#respostas_paciente").html("");
		$("#pergunta_paciente").append('<div class="well well-sm">'+ localStorage.getItem("pergunta") + '</div>');
		//console.log("pergunta -> " + pergunta);
		
		for(i = 1; i <= localStorage.length -2; i++){
			
			answers[i] = localStorage.getItem("answer" + i);
			$("#respostas_paciente").append('<div id="styleRespostasPaciente" class="col-xs-6"><button onclick= verifyAnswer'+i+'() class="btn col-xs-6" type="button">' + answers[i] + '</button></div>');

			//console.log(localStorage);
			console.log("repostas ->" + answers[i]);
		}
	}

	function verifyAnswer1(){
		if(localStorage.getItem("Resposta Correta") == "1"){
			console.log("Correto");
			alert("Resposta Correta");
		}
		else{
			console.log("Errado");
			alert("Resposta Errada");
		}
	}
	function verifyAnswer2(){
		if(localStorage.getItem("Resposta Correta") == "2"){
			console.log("Correto");
			alert("Resposta Correta");
		}
		else{
			console.log("Errado");
			alert("Resposta Errada");
		}	
	}
	function verifyAnswer3(){
		if(localStorage.getItem("Resposta Correta") == "3"){
			console.log("Correto");
			alert("Resposta Correta");
		}
		else{
			console.log("Errado");
			alert("Resposta Errada");
		}
	}
	function verifyAnswer4(){
		if(localStorage.getItem("Resposta Correta") == "4"){
			console.log("Correto");
			alert("Resposta Correta");
		}
		else{
			console.log("Errado");
			alert("Resposta Errada");
		}
	}
