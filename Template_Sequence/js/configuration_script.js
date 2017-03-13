$(document).ready(function(){
	
	$("#generate").click(function () {	
		var number_of_images = $("#number_of_images").val();
		
		$('#ask_number_div').hide();		
		
		$('#insert_img_div').append('<h4>Insira as imagens na ordem correcta:</h4>');
		
		for(var i=0; i<number_of_images; i++){
			$("#insert_img_div").append('<div id="img'+i+'_div" class="col-sm-3 div-border single_img_div"> <input type="file" id="input'+i+'" onchange="readURL(this, '+i+')" /> </div>');
		}
	});

});

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


