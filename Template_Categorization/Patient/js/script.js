
var categorias = ["Carros", "Livros", "Desporto"];

function start(num, images){
    var i, col, temp, order;
    var temp_images = images.slice();
    for(i=0; i<num; i++){
        temp = Math.floor((Math.random() * temp_images.length));
        order = images.indexOf(temp_images[temp]);

		      $("#insert_img_div").append('<img id="image'+order+'" style="margin:15px;" src="'+temp_images[temp]+'" class="single_img_div" ondragstart="drag(event)">');

        temp_images.splice(temp, 1);


    }
    generateDivForCat(categorias);

}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev, constante) {

    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
	   //ev.target.appendChild(document.getElementById(data));
     $('#'+ev.target.id).append('<div id=tmp'+constante+' class="col-xs-3 div-border"></div>');


}

function generateDivForCat(cat){

  for (var i = 0; i < cat.length; i++) {
    $("#insert_cat_div").append('<div id="all_cat'+i+'" class="all_cat_div col-xs-3 "><h4>'+cat[i]+'</h4><div id="cat_div'+i+'" style="margin:10px;" class="div-border single_cat_div col-xs-3" ondrop="drop(event, i)" ondragover="allowDrop(event)"></div></div>');

  }
}
