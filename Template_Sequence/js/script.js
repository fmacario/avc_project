$("#generate").click(function () {
	//$("#ask_number_div").hide();
	
	var number_of_images = $("#number_of_images").val();
	console.log(number_of_images);
	
	for(i=0; i<number_of_images; i++){
		$("#insert_img_div").append('<div id="single_insert_div" class="col-sm-3 div-border"><input type="file" id="img_input'+i+'" onchange="readURL(this, i);"/> <img id="img'+i+'" src="#"\> </div>');
	}
});

function readURL(input) {
   if (input.files && input.files[0]) {
   	var reader = new FileReader();

      reader.onload = function (e) {
	      $('#img\"+i+\"')
	      	.attr('src', e.target.result)
            .width(100%)
            .height(100%);
         };

         reader.readAsDataURL(input.files[0]);
	}
}


/*
$("#fileinput").change(function(){
			
			var i = 0;
    		var images_div = document.getElementById("images_div");
    		var answer_div = document.getElementById("answer_div");
			var paths = [];			
			
    		for (i=0; i< this.files.length; i++) {
    			
    			images_div.innerHTML += "<div ondrop=\"drop(event)\" ondragover=\"allowDrop(event)\" class=\"brightness div-setup col-sm-3\"\"><img draggable=\"true\" ondragstart=\"drag(event)\" class=\"img-size image-responsive\" src=\"#\" id=\"img"+i+"\"></div>";

				answer_div.innerHTML += "<div ondrop=\"drop(event)\" ondragover=\"allowDrop(event)\" class=\"div-border div-setup col-sm-3\" id=\"ans"+i+"\"></div>";
    		
    			console.log(this.files[i].pathname);
    			paths[i] = "img/"+this.files[i].name;
    			
    			console.log(paths);
    		
    		}
    		
    		for (i=0; i< this.files.length; i++) {
    			
				var img = document.getElementById("img"+i);    			

    			var toPop = Math.floor(Math.random()*paths.length);

    			img.src = paths[toPop];	//"img/"+this.files[i].name;
    			
    			paths.splice(toPop, 1);
			}
    		var input = document.getElementById("fileinput").style.display = "none";
    		
});


function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    ev.dataTransfer.setData("name", ev.target.src);
}


var itemp=0;

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var name = ev.dataTransfer.getData("name");
    
    var div = ev.target.id;
	 
	 var nImg = parseInt(((name.split("/").reverse())[0]).split("").reverse()[4]);	 
	 var nDiv = parseInt(((div).split("").reverse()[0]))+1;	 
	 
	 if(nImg == nDiv){
		$("#"+div+"").html("");
	 	ev.target.appendChild(document.getElementById(data));		 
	 
	 }
	 else {
	 	$("#"+div+"").html("<p id=\"temp"+itemp+"\">imagem errada<p>");
	 	$("#temp"+itemp).fadeOut(1000);
	 	itemp++;
	 }
}
*/

















//var img = 	
})