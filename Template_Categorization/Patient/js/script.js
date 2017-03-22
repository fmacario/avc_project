function start(num, images){
    var i, col, temp, order;
    var temp_images = images.slice();

    for(i=0; i<num; i++){
        temp = Math.floor((Math.random() * temp_images.length));
        order = images.indexOf(temp_images[temp]);

		      $("#insert_img_div").append('<img id="image'+order+'" style="margin:15px;" src="'+temp_images[temp]+'" class="single_img_div" ondragstart="drag(event)">');

        temp_images.splice(temp, 1);
    }

	$("#insert_cat_div").append('<div id="all_cat0" class="all_cat_div col-xs-3"><h4>Livros</h4><div id="cat_div0" style="margin:10px;" class="div-border single_cat_div col-xs-3" ondrop="drop(event)" ondragover="allowDrop(event)"></div></div>');
	$("#insert_cat_div").append('<div id="all_cat1" class="all_cat_div col-xs-3"><h4>Desporto</h4><div id="cat_div1" style="margin:10px;" class="div-border single_cat_div col-xs-3" ondrop="drop(event)" ondragover="allowDrop(event)"></div></div>');
	$("#insert_cat_div").append('<div id="all_cat2" class="all_cat_div col-xs-3"><h4>Carros</h4><div id="cat_div2" style="margin:10px;" class="div-border single_cat_div col-xs-3" ondrop="drop(event)" ondragover="allowDrop(event)"></div></div>');

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

     $('#single_image_div').append('<div class="col-xs-3 div-border"><img id="img'+x+'" src="'+e.target.result+'" class="img-size div-border"></div>');

}
