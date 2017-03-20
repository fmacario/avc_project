function start(num, images){
    var i, col, temp, order;
    var temp_images = images.slice();

    for(i=0; i<num; i++){
        temp = Math.floor((Math.random() * temp_images.length));
        order = images.indexOf(temp_images[temp]);
		
		$("#insert_img_div").append('<img id="image'+order+'" style="height:90%; margin:15px;" src="'+temp_images[temp]+'" class="img single_img_div" ondragstart="drag(event)">');
		
        temp_images.splice(temp, 1);
    }
	
	$("#insert_cat_div").append('<h4>Livros</h4><div id="cat_div" style="margin:10px;" class="div-border single_cat_div col-sm-4" ondrop="drop(event)" ondragover="allowDrop(event)"></div>');
	$("#insert_cat_div").append('<h4>Desporto</h4><div id="cat_div2" style="margin:10px;" class="div-border single_cat_div col-sm-4" ondrop="drop(event)" ondragover="allowDrop(event)"></div>');
	$("#insert_cat_div").append('<h4>Carros</h4><div id="cat_div3" style="margin:10px;" class="div-border single_cat_div col-sm-4" ondrop="drop(event)" ondragover="allowDrop(event)"></div>');
	
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