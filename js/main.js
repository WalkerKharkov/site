var doc=document;


function curiosityBlock(){
    $(window).bind("contextmenu", function(event){
        event.preventDefault();
        return false;
    }).bind("keypress keyup keydown",function(event) {
        if (event.keyCode == 123) {
            event.preventDefault();
            return false;
        }
    });

}

