function start(images){
    var i, col, height, temp, order;
    var num = images.length;
    var temp_images = images.slice();

    if(num>=5){
        height = 50;
        col = parseInt(12/num)+1;
    }
    else{
        col = 12/num;
        height = 100;
    }

    for(i=0; i<num; i++){
        temp = Math.floor((Math.random() * temp_images.length));
        order = images.indexOf(temp_images[temp]);

        $('#choice_div').append('<div style="height:'+height+'%" id="choice'+i+'" class="col-sm-'+col+' single_img_div"> <img id="image'+order+'" src="'+temp_images[temp]+'" class="img" ondragstart="drag(event)"> </div>');
        $('#answer_div').append('<div style="height:'+height+'%" id="answer'+i+'" class="col-sm-'+col+' single_img_div" ondrop="drop(event, '+num+')" ondragover="allowDrop(event)"></div>');
        
        temp_images.splice(temp, 1);
    }
    
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

var counter = 0;
function drop(ev, num) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    
    imageId = data.split("").reverse()[0];
    divId = ev.target.id.split("").reverse()[0];


    if( $('#'+ev.target.id+':has(img)').length == 0 ){
        if(imageId == divId){
            $('#'+ev.target.id).append(document.getElementById(data));
            counter++;
            if(counter == num){
                alert('Parabéns! Tarefa concluída com sucesso!');    
            }
        }
        else{
            $('#'+ev.target.id).append('<p>Tente novamente</p>');
            setTimeout(function(){
                $('#'+ev.target.id).html("");
            }, 1000);
        }
    }    
}