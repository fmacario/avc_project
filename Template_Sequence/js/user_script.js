function start(num){
    var i, col, height;
    
    if(num>=5){
        height = 50;
        /*if( (num%12) == 0 ){
            col = 2;
        }
        else if( (num%4) == 0 || num%7 == 0){
            col = 3;
        }
        else if( ((num%3) == 0) ){
            col = 4;
        }
        else{*/
            col = parseInt(12/num)+1;
        //}
    }
    else{
        col = 12/num;
        height = 100;
    }
    console.log(col);
    
    for(i=0; i<num; i++){
        $('#choice_div').append('<div style="height:'+height+'%" id="choice'+i+'_div" class="col-sm-'+col+' single_img_div">choice</div>');
        $('#answer_div').append('<div style="height:'+height+'%" id="answer'+i+'_div" class="col-sm-'+col+' single_img_div">answer</div>');
    }
    
}