   	function getQuestion(){
        
        localStorage.clear();
       	var pergunta = document.getElementById("pergunta").value;
       	localStorage.setItem("pergunta", pergunta);
       	console.log(localStorage);
  
    }

    function getNumberAnswers(){
			  		
		var answerNumber = document.getElementById("sel").value;
		var i;
		

		$("#div_respostas").html("");

		for(i = 1; i <= answerNumber; i++){
			$("#div_respostas").append('<div id="answer'+i+'" class="form-group checkbox"> <label class= "col-xs-12"for="usr">Resposta' + i + '</label><div class="col-xs-6 "><input id="answerNumber'+i+'"type="text" class="form-control " > </div><label class="col-xs-6"><button id="button'+ i + '" type="button" onclick="correctAnswer' +i + '()">Correta</button></label> </div>');
	   	}

	   	$("#div_respostas").append('<div class="col-xs-12" id="butaoGuardar"><a href= "pacient.html"><button onclick="getAnswers()" class="col-xs-2" type="button" >Guardar</button></a></div>');
	} 

	function getAnswers(){
		var answerNumber = document.getElementById("sel").value;
		var answers = [];
		var i;
		
		for(i = 1; i <= answerNumber; i++){
			answers[i] = document.getElementById("answerNumber" + i).value;
			localStorage.setItem("answer" + i, answers[i]);
			console.log(localStorage);
		}
	}

	function correctAnswer1(){
		localStorage.setItem("Resposta Correta", "1");
		console.log(localStorage);
	}

	function correctAnswer2(){
		localStorage.setItem("Resposta Correta", "2");
		console.log(localStorage);
	}

	function correctAnswer3(){
		localStorage.setItem("Resposta Correta", "3");
		console.log(localStorage);;
	}

	function correctAnswer4(){
		localStorage.setItem("Resposta Correta", "4");
		console.log(localStorage);
	}
