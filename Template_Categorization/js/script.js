$(document).ready(function(){
	
	$("#generate").click(function () {	
		var number_of_images = $("#number_of_images").val();
		
		$('#ask_number_div').hide();
		$('#insert_img_div').append('<h4 align="center">Arraste as imagens para a categoria correta:</h4>');
		
		for(var i=0; i<number_of_images; i++){
			$("#insert_img_div").append('<div id="img'+i+'_div" class="col-sm-3 single_img_div" ondragstart="drag(event)"> <input type="file" id="input'+i+'" onchange="readURL(this, '+i+')" /> </div>');
		}
	});

});

$(document).ready(function(){
	
	$("#generate2").click(function () {	
		var number_of_categories = $("#number_of_categories").val();
		
		$('#ask_category_div').hide();
		
		for(var i=0; i<number_of_categories; i++){
			$("#insert_cat_div").append('<div id="cat'+i+'_div" class="col-sm-3 all_cat_div"><div id=text'+i+'_input class="text_input"><h4 id="text'+i+'_cat'+i+'_div"><input id="name_of_categories" type="text"><button id="generate'+i+'3">OK</button></h4></div><div id="cat'+i+'_div" style="margin:10px;" class="div-border single_cat_div" ondrop="drop(event)" ondragover="allowDrop(event)"></div></div>');
		}
		
//		$("#generate13").click(function () {
		
//		for(var i=0; i<number_of_categories; i++){
//			$('#text'+i+'_input').hide();
				
//				$("#insert_cat_div").append('<div id="cat'+i+'_div" class="col-sm-3 all_cat_div"><h4 id="text'+i+'_cat'+i+'_div">hello</h4></div>');
//		}
//		});
		
	});

});

//function handleElement(i) {
//    document.getElementById("b"+i).onclick=function() {
//        alert(i);
//    };
//}

//for(i=1; i<11; i++) 
//    handleElement(i);

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