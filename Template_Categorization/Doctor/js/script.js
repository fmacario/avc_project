$(document).ready(function(){
			
	$("#generate2").click(function () {	
		var number_of_categories = $("#number_of_categories").val();
		
		if (number_of_categories == "" || number_of_categories <= 0){
			alert("Insira um número de categorias válido."); 
			throw new Error("Número inválido.");
		}
		
		$('#ask_category_div').hide();
		
		for(var i=0; i<number_of_categories; i++){
			$("#insert_cat_div").append('<div id="cat'+i+'_div" class="col-sm-3 all_cat_div"><div id=text'+i+'_input class="text_input"><div id="text'+i+'_cat'+i+'_div"><input id="categorie'+i+'" type="text"><button id="generate'+i+'3" onclick="generatetitle(categorie'+i+', generate'+i+'3, text'+i+'_input)">OK</button></div></div><div id="cat'+i+'_div" style="margin:10px;" class="single_cat_div" ondrop="drop(event)" ondragover="allowDrop(event)"><input multiple type="file" id="result'+i+'" class="single_cat_div div-border"/><img id="img'+i+'"></img></div></div>');
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
	if (input.files && input.files[0]) {    
		var reader = new FileReader();    	
    	reader.onload = function (e) {
    		$('#input'+i).hide();
			$('#img'+i+'_div').append('<img id="img'+i+'" src="" class="img-size">');
			$('#img'+i+'').attr('src', e.target.result);
    	};
    	reader.readAsDataURL(input.files[0]);
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