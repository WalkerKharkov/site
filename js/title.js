var keepEl=doc.querySelector("#keep"),
    withEl=doc.querySelector("#with"),
    restEl=doc.querySelector("#rest"),
    webdevEl=doc.querySelector("#webdev"),
    alexEl=doc.querySelector("#alex"),
    viewMore=doc.querySelector("#viewmore"),
    tOut;

function pageInit(){
    $.backstretch("img/m_bckgrd.jpg");
    var value,
        rate=1;
    value=(window.innerWidth>window.innerHeight) ? window.innerWidth : window.innerHeight;
    rate=(window.innerWidth<768) ? 1.4 : rate;
    value*=rate;
    var keep=Math.ceil(value*0.032),
        wit=Math.ceil(value*0.0375),
        rest=Math.ceil(value*0.044),
        view=Math.ceil(value*0.016);
    keepEl.style.fontSize=keep+"px";
    withEl.style.fontSize=wit+"px";
    restEl.style.fontSize=webdevEl.style.fontSize=alexEl.style.fontSize=rest+"px";
    viewMore.style.fontSize=view+"px";
    clearTimeout(tOut);
    viewMore.style.visibility="hidden";
    showMore();
}

function showMore(){
    var width=window.innerWidth,
        height=window.innerHeight,
        heightPlus=(height *.13>parseInt(viewMore.style.fontSize)*3) ? Math.ceil(height*.13) : parseInt(viewMore.style.fontSize)* 3,
        top=height+heightPlus,
        halfLength=Math.ceil(parseInt(viewMore.style.fontSize) *.63)*5;
    width=Math.ceil(width/2-halfLength);
    viewMore.style.top=top+"px";
    viewMore.style.visibility="visible";
    viewMore.style.left=width+"px";
    (function draw(top){
        if (top<=height-heightPlus){
            clearTimeout(tOut);
            return;
        }
        tOut=setTimeout(function(){
            viewMore.style.top=top+"px";
            top--;
            draw(top);
        }, 10)
    })(top);
}



(function(){
    //сделать промис на загрузку контента
    doc.body.style.visibility="visible";
    //curiosityBlock();/* блокировка просмотра кода */
})();

$(window).bind("load resize", pageInit);
