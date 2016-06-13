var doc=document,
    controls=doc.querySelector(".controls"),
    screenHeight,
    screenWidth,
    currentControlsMarginTop,/////////////////////////////////////////////
    copyright=doc.querySelector(".copyright"),
    screenFormFactor,////////////////////////////////////////////////////////////////////////////
    buttons=[].slice.apply(doc.querySelectorAll(".btn")),
    contentVisible=false,
    step,
    i;

var controller={
    info: function(){
        var info=doc.querySelector(".info");
        buttonsMoveUp();
        setInterval(function(){$(info).show("slow")}, 3000);
        //buttonsMoveUp().then($(info).show("slow"));
    },
    portfolio: function(){
        //buttonsMoveDown();

    },
    mail: function(){
        buttonsMoveUp();
    }
};

function contentVisibleToggle(){
    if (!contentVisible) {
        buttons.forEach(function(button){
            button.style.marginBottom="10px";
        });
    }
    contentVisible=!contentVisible;
}

function buttonsMoveUp(){
    step=currentControlsMarginTop;
    (function shift(step){
        if (step<=10){
            clearTimeout(tOut);
            return;
        }
        tOut=setTimeout(function(){
            controls.style.marginTop=step+"px";
            step--;
            shift(step);
        }, 5)
    })(step);
    contentVisibleToggle();
}

function buttonsMoveDown(){
    screenHeight=window.innerHeight;
    screenWidth=window.innerWidth;
    var step=parseInt(controls.style.marginTop),
        value=(screenWidth>screenHeight) ? screenWidth : screenHeight,
        rate= 1,
        dest;
    rate=(screenWidth<900) ? 1.2 : rate;
    value*=rate;
    dest=(screenWidth<768) ? Math.ceil(screenHeight/8) : Math.ceil(screenHeight / 2 - Math.ceil(value * 0.024 / 2));
    (function shift(step){
        if (step>=dest){
            clearTimeout(tOut);
            return;
        }
        tOut=setTimeout(function(){
            controls.style.marginTop=step+"px";
            step++;
            shift(step);
        }, 5)
    })(step);
    contentVisibleToggle();
}

function showPage(){//////////////////////////////////////////////////////////////////////////////

}

function pageInit(){
    screenHeight=window.innerHeight;
    screenWidth=window.innerWidth;
    var value,
        rate=1;
    value=(screenWidth>screenHeight) ? screenWidth : screenHeight;
    rate=(screenWidth<900) ? 1.2 : rate;
    value*=rate;
    copyright.style.fontSize=controls.style.fontSize=Math.ceil(value*0.024)+"px";
    if (contentVisible) return;
    if (screenWidth<768){
        currentControlsMarginTop=Math.ceil(screenHeight/8);///////////////////////////////////////////////
        //screenFormFactor="vertical";//////////////////////////////////////////////////////////////////
    }else{
        currentControlsMarginTop=Math.ceil(screenHeight / 2 - Math.ceil(value * 0.024 / 2));///////////////////////////////////////////
        //screenFormFactor="horizontal";///////////////////////////////////////////////////////////
    }
    controls.style.marginTop = currentControlsMarginTop+"px";//////////////////////////////////////////////////////
    buttons.forEach(function(button){
        button.style.marginBottom=Math.ceil(currentControlsMarginTop/2)+"px";////////////////////////////////////////////
    });
}


(function backgroundRender(){
    $.backstretch("../img/wall.jpg");
})();

controls.addEventListener("click", function (event) {
    var target=event.target;
    if (!target.getAttribute("data-action")) return;
    controller[target.getAttribute("data-action")]();
});


$(window).bind("load resize", pageInit);