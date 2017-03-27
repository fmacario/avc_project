$(document).ready(function(){
	
	$('#generate').click(function () {	
		var number_of_images = $("#number_of_images").val();
		
		if(number_of_images == "" || number_of_images <= 0){
			alert("Insira um número válido de imagens");
			throw new Error("Número inválido de imagens");
		}
		
		if( $('#insert_img_div:has(div)').length > 0 ){
			$('#insert_img_div').html('');
		}

		$('#insert_img_div').append('<h4><b>Seleccione</b> ou <b>arraste de uma pasta</b> as imagens na ordem correcta:</h4>');
		$('#insert_img_div').append('<button id="save">Guardar Tarefa</button><br><br>');
		
		for(var i=0; i<number_of_images; i++){
			$("#insert_img_div").append('<div id="img'+i+'_div" class="col-sm-3 single_img_div"> <input type="file" id="input'+i+'" class="input" onchange="readURL(this, '+i+')" /> </div>');
		}
	});

	$('#save').click(saveTask());

});

function readURL(input, i) {
	if (input.files && input.files[0]) {    
		var reader = new FileReader();

    	reader.onload = function (e) {
    		$('#input'+i).hide();
      		$('#img'+i+'_div').append('<img id="img'+i+'" src="'+e.target.result+'" class="img">');
    	};
    	reader.readAsDataURL(input.files[0]);
  	}	
}	


function saveTask(){
	console.log("lets save!");
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

	


