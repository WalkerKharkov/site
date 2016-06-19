var controls=doc.querySelector(".controls"),
    copyright=doc.querySelector(".copyright"),
    content=doc.querySelector(".content"),
    hint=doc.querySelector("#hint"),
    myphoto=doc.querySelector("#myphoto"),
    screenHeight, screenWidth, action, i,
    hintClicked, currentHint, photowidth;



function showPage(){//////////////////////////////////////////////////////////////////////////////

}

function pageInit(){
    $.backstretch("../img/wall.jpg");
    screenHeight=window.innerHeight;
    screenWidth=window.innerWidth;
    var value,
        rate=1;
    value=(screenWidth>screenHeight) ? screenWidth : screenHeight;
    rate=(screenWidth<768) ? 1.4 : rate;
    value*=rate;
    content.style.fontSize=Math.ceil(value*0.014)+"px";
    copyright.style.fontSize=controls.style.fontSize=Math.ceil(value*0.018)+"px";
    controls.style.marginTop = (screenWidth<768) ? Math.ceil(screenHeight/8)+"px" : Math.ceil(screenHeight / 2 - Math.ceil(value * 0.024 / 2))+"px";
    $(".btn").css("margin", "10px");
    photowidth=Math.ceil(screenWidth/6.4);
    myphoto.style.width=photowidth+"px";
    myphoto.style.height=Math.ceil(1.12*photowidth)+"px";
}

controls.addEventListener("click", function (event) {
    action=event.target.getAttribute("data-action");
    if (!action) return;
    action="."+action;
    $(".controls").hide(700);
    $(action).show(1000);
    if (action==".info"){
        hint.style.height=doc.querySelector(".fa-facebook").offsetHeight+"px";
        hint.style.lineHeight=hint.style.height;
    }
});

function back(){
    $(action).hide(700);
    $(".controls").show(1000);
    hintClicked=false;
    hint.innerText="";
}

var hints={
    "vk": "view my page in VK",
    "facebook": "view my page in Facebook",
    "linkedin": "view my page in LinkedIn",
    "github": "view my repositories in GitHub",
    "skype": "my nick in Skype: walker_kharkov",
    "whatsapp": "my phone number: +38 (067) 936 46 45"
};

function hintShow(event){
    if (hintClicked) return;
    var target=event.target;
    while(target != this) {
        if (target.tagName == 'A') {
            currentHint=target.id;
            hint.innerText=hints[currentHint];
            break;
        }
        target = target.parentNode;
    }
}

function hintHide(){
    if (hintClicked) return;
    hint.innerText="";
}

function hintClick(event){
    if (hintClicked){
        hintClicked=false;
        hintShow(event);
        hintClicked=true;
    }
    hintClicked=true;
    hintShow(event);

}

/*(function(){
    $.backstretch("../img/wall.jpg");
    //curiosityBlock(); ///////////////////////////////////////////////////////////////
})();*/

$(window).bind("load resize", pageInit);
$("button.back").bind("click", back);
$(".socials").bind("mouseover", hintShow).bind("mouseleave", hintHide).bind("click", hintClick);
