



   var imgTitle;	//titulo da imagem sem path/extencao
   var input;		//input dado para adivinhar
   var nrLetras;	//nr de letras para esconder
  
$(function () {
	  //Function to upload image 
    $(":file").change(function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = imageIsLoaded;
            reader.readAsDataURL(this.files[0]);
			imgTitle = takeExtension(this.files[0].name);
			$('#palavra').val(imgTitle);
        }
    });
	
	//Butao de esconder todas as letras 
	$("#todos").on('click', function(){
		
		assertImgInsert();
		getInput();
		
		var stringWithoutSpace = input.replace(/ /g,"") //tira os espaços entre os nomes para contagem de letras
        $("#nrletras").val(stringWithoutSpace.length);
	});

	//Butao de esconder metade das letras 
	$("#metade").on('click', function(){
		
		assertImgInsert();
		getInput();
		
		var stringWithoutSpace = input.replace(/ /g,"") //tira os espaços entre os nomes para contagem de letras
        $("#nrletras").val(stringWithoutSpace.length/2 | 0); //arredonda para baixo
	});
	
	//Submit button
	$('#submitBtn').on('click', function(){
		
			assertImgInsert();
			getInput();
			nrLetras = $('#nrletras').val();		//nrLetras é o nr de letras a esconder 
			
		
			if (nrLetras > input.length){alert("Número de letras a esconder é superior ao número de letras na palavra!");throw new Error("Assertion failed");}
			else if (nrLetras <= 0) {alert("Número de letras não pode ser menor ou igual a 0!");throw new Error("Assertion failed");}
			else{
				console.log(input);
				console.log(nrLetras);
				
				//CODE GOES HERE TO GENERATE THE PATIENT TEMPLATE SIDE
			}
			
			
			
		});
});

//Load the image and take out the upload button
function imageIsLoaded(e) {
    $('#myImg').attr('src', e.target.result);
	var input = document.getElementById("result").style.display = "none";

}

//Get name without extentions
function takeExtension(e) {
		parts = e.split("."); // This is not an answer for all the scnarios, like if file name is `services.controller.js`
		e = parts[0];
		return e;
}

//Assert image was placed
function assertImgInsert(){
	if(imgTitle==null){alert("Insira imagem!");throw new Error("Image not inserted");}	//se não houver imagem, erro
}

//Get input
function getInput(){
	
	input = $('#palavra').val();		//input é a palavra
	
	if(input == "") {input = imgTitle;} 	//se nao houver input, palavra = titulo da img
}
	
	

