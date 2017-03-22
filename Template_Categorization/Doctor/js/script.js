$(document).ready(function(){
			
	$("#generate2").click(function () {	
		var number_of_categories = $("#number_of_categories").val();
		
		if (number_of_categories == "" || number_of_categories <= 0){
			alert("Insira um número de categorias válido."); 
			throw new Error("Número inválido.");
		}
		
		$('#ask_category_div').hide();
		
		for(var i=0; i<number_of_categories; i++){
			$("#insert_cat_div").append('<div id="cat'+i+'_div" class="col-xs-3 all_cat_div div-border"><div id="text'+i+'_cat'+i+'_div" class="div-border" style="height: 20%;"><input id="categorie'+i+'" type="text"><button id="generate'+i+'3" onclick="generatetitle(categorie'+i+', generate'+i+'3, text'+i+'_cat'+i+'_div)">OK</button></div> <div id="single_cat'+i+'_div" class="row single_cat_div div-border" ondrop="drop(event)" ondragover="allowDrop(event)"><input multiple type="file" id="result'+i+'" class="div-border" style="max-width: 100%" onchange="readURL(this, '+i+')"/></div></div>');
		}
	
	});

});
	
function generatetitle(nome, botao, divTexto){
	
	var val = $("#"+nome.id).val();
	console.log(val);
	
	$("#"+nome.id).hide();
	$("#"+botao.id).hide();
	$("#"+divTexto.id).html(val);
	
}

function readURL(input, i) {
	for(var x=0; x<input.files.length; x++){
		if (input.files && input.files[x]) {    
			var reader = new FileReader();
			
			
			reader.onload = function (e) {	
				$('#result'+i).hide();
				$('#single_cat'+i+'_div').append('<div class="col-xs-3 div-border"><img id="img'+x+'" src="'+e.target.result+'" class="img-size div-border"></div>');
				console.log(e.target.result);
			};
			reader.readAsDataURL(input.files[x]);
		}
	}
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev, target) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
	ev.target.appendChild(document.getElementById(data));
}