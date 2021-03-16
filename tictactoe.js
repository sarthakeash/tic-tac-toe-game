$(document).ready(function() {
    
    $(".little_table").find("td:not(.filled)").click(function() {



  
        $(".timer").removeClass("timer1");
        $(".timer").width(); 
        $(".timer").addClass("timer1");



        
       
       if($(this).closest('.live').length === 0) {  return;}

     
        var colour = $("#turn").hasClass("red") ? "red" : "blue";

        
        little_table = $(this).closest('.little_table');
        little_col = $(this).attr('class');
        little_row = $(this).closest('tr').attr('class');

        
        little_pos = '.col-' + little_col + '.row-' + little_row;

       
        $(".live").removeClass('live');
        myf();
       
function myf(){
        if($(".little_table" + little_pos + " td").not('.filled').length === 0) { 
            $(".big_table").addClass('live');} 
        else { $(".little_table" + little_pos).addClass('live');}}

        

        var div = $("<div>").addClass("marker").addClass(colour).addClass('col-' + little_col).addClass('row-' + little_row);
        $(this).html(div); 
        $(this).addClass("filled"); 
        $(this).unbind("click"); 

        markers = little_table.find(".marker").filter("." + colour);

        if(threeInRow(markers) || threeInColumn(markers) || threeInDiagonal(markers)) {
            
            little_table.addClass(colour);
            if(colour === 'red') {
    
                little_table.find('td').css('backgroundColor', '#ffaaaa');

        
            } else {
              
                little_table.find('td').css('backgroundColor', '#aaaaff');
            }
        }

      
        markers = $('.little_table').filter("." + colour);

        if(threeInRow(markers) || threeInColumn(markers) || threeInDiagonal(markers)) {
   
            win();
        } else {
            if($("td").not('.filled').length === 0) {
             
                $("#turn").fadeOut(500, function() {
                    showNewGame();
                });
            } else {
           
                $("#turn").removeClass(colour).addClass((colour === "red") ? "blue" : "red");
           
            }
        }


 
    });






});

function win() {
    var curTop = $("#turn").offset().top;
    var top = $(".big_table").position().top;
    var left = $(".big_table").offset().left;

    $("#turn").css({
        "position": "absolute",
        "left": left + "px",
        "top": curTop + "px"
    });

    $("#turn").text("");

    $("#turn").animate({
        top: top + "px",
        height: "560px",
        opacity: 0.85
    }, 500, function() {
        showNewGame();
    });
}

function showNewGame() {
    $("#newGame").css('display', 'block').hide().fadeIn(500);
}

function threeInRow(markers) {
       return (($(markers).filter(".row-1").length === 3) || ($(markers).filter(".row-2").length === 3) || ($(markers).filter(".row-3").length === 3));
}

function threeInColumn(markers) {
       return (($(markers).filter(".col-1").length === 3) || ($(markers).filter(".col-2").length === 3) || ($(markers).filter(".col-3").length === 3));
}

function threeInDiagonal(markers) {
 
    if($(markers).filter(".col-2").filter(".row-2").length === 0) {
        return false;
    }

    if($(markers).filter(".col-1").filter(".row-1").length === 1 && $(markers).filter(".col-3").filter(".row-3").length === 1) {
        return true;
    }

    if($(markers).filter(".col-1").filter(".row-3").length === 1 && $(markers).filter(".col-3").filter(".row-1").length === 1) {
        return true;
    }

    return false;
}







 