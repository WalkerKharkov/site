function Slider(images, settings) {
    var i = 0;

    //images initialization
    this.imgSource = [];
    this.imgAlt = [];
    this.imgLink = [];
    this.title = [];
    while (images[i + ""]) {
        this.imgSource[i] = images[i + ""].name;
        this.imgAlt[i] = images[i + ""].alt;
        this.imgLink[i] = images[i + ""].href;
        this.title[i] = images[i + ""].title;
        i++;
    }

    //settings initialization
    this.controlsColor = settings.controlsColor || "lightgray";
    this.controlsActiveColor = settings.controlsActiveColor || "#B34EE9";
    this.counter = settings.counter || 0;
    this.imgPath = settings.imgPath || "img/";
    this.index = settings.startindex || 0;
    this.delay = settings.delay || 50;
    this.colorDelay = settings.colorDelay || null;
    this.pauseValue = settings.pause || 40;
    this.elem = settings.elem || document.body;
    this.titleShow = settings.title || false;

    //internal initialization
    this.pause = 0;
    this.maxIndex = this.imgSource.length - 1;
    this.show = true;
    this.elem.style.opacity = 0;
    this.tOut = setTimeout(function () {}, 0);
    this.doc = document;
    this.href = this.elem.parentElement;
    this.elemWidth = (settings.bootstrap) ? "100%" : this.elem.style.width;
    this.elemHeight = (settings.bootstrap) ? "100%" : this.elem.style.height;

    this.render = this.render.bind(this);
    this.imgShow = this.imgShow.bind(this);
    this.stopRender = this.stopRender.bind(this);
    this.controlsEventListener = this.controlsEventListener.bind(this);
    this.showNext = this.showNext.bind(this);
    this.imgClick = this.imgClick.bind(this);

    //slider controls controller
    this.controller = {
        pauseOff: function(slider) {
            if (slider.pauseButton.classList.contains("pauseActive")) {
                slider.pauseButton.classList.toggle("pauseActive");
                slider.render(slider.counter);
            }
        },
        prev : function(slider) {
            slider.index = (--slider.index < 0) ? slider.maxIndex : slider.index;
        },
        next : function(slider) {
            slider.index = (++slider.index > slider.maxIndex) ? 0 : slider.index;
        }
    };

    var imgWrapper = this.elem.parentElement.parentElement,
        controlPanel = this.doc.createElement("div"),
        controls = '<div class="col-sm-10">' +
                        '<i class="fa fa-arrow-left fa-3x fa_slider" id="sliderprev" data-attr="prev"></i>' +
                        ' &nbsp;&nbsp; ' +
                        '<i class="fa fa-pause fa-3x fa_slider" id="sliderpause" data-attr="pause"></i>' +
                        '&nbsp;&nbsp;&nbsp;&nbsp;' +
                        '<i class="fa fa-arrow-right fa-3x fa_slider" id="slidernext" data-attr="next" /*style="margin-right: 100px"*/></i>' +
                    '</div>' +
                    '<div class="col-sm-2">' +
                        '<button class="btn back" id="back" data-attr="back">back</button>' +
                    '</div>',
        controlsStyle = '<style type="text/css">.fa_slider:focus,.fa_slider:hover,.fa_slider:active,' +
            '.pauseActive{color:' + this.controlsActiveColor + ';cursor:pointer}</style>';
    if (this.colorDelay) {
        controlsStyle += '<style type="text/css">.fa_slider{-webkit-transition: color ' + this.colorDelay + 's linear ' +
            this.colorDelay / 2 + 's;-moz-transition: color ' + this.colorDelay + 's linear ' + this.colorDelay / 2 +
            's;' + '-o-transition: color ' + this.colorDelay + 's linear ' + this.colorDelay / 2 + 's;transition: color ' +
            this.colorDelay + 's linear ' + this.colorDelay / 2 + 's;</style>';
    }
    this.titleText = this.doc.createElement("div");
    controlPanel.style.cssText = "width:" + getComputedStyle(this.elem).width + ";text-align:center;color:" +
        this.controlsColor + ";padding:15px;";
    controlPanel.classList.add("row");
    controlPanel.setAttribute("id", "sliderControlPanel");
    controlPanel.insertAdjacentHTML("beforeEnd", controls);
    imgWrapper.appendChild(controlPanel);
    controlPanel.insertBefore(this.titleText, controlPanel.firstElementChild);
    this.titleText.classList.add("title");
    if (this.titleShow) this.titleText.classList.add("titleshow");
    this.doc.head.insertAdjacentHTML("beforeEnd", controlsStyle);

    this.pauseButton = this.doc.querySelector("#sliderpause");
    this.sliderControlPanel = this.doc.querySelector("#sliderControlPanel");

    controlPanel.addEventListener("click", this.controlsEventListener);
    this.elem.parentElement.addEventListener("click", this.imgClick);

    this.imgShow(this.index);
    this.render(this.counter);
}

Slider.prototype.controlsEventListener = function(event){
    var target = event.target.getAttribute("data-attr");
    if (!target) return false;
    if (target != "pause"){
        if (target == "back"){
            back();
        }else {
            this.controller.pauseOff(this);
            this.controller[target](this);
            this.showNext();
        }
    }else{
        if (this.pauseButton.classList.contains("pauseActive")){
            this.render(this.counter);
        }else{
            this.stopRender();
        }
        this.pauseButton.classList.toggle("pauseActive");
    }
};

Slider.prototype.imgClick = function(){
    if (!this.imgLink[this.index]){
        event.preventDefault();
        if(this.elem.classList.contains("clicked")){
            this.elem.style.width = this.elemWidth;
            this.elem.style.height = this.elemHeight;
            if (!this.pauseButton.classList.contains("pauseActive")) this.render(this.counter);
        } else {
            this.elem.style.opacity = 1;
            this.elem.style.width = window.innerWidth + "px";
            this.elem.style.height = window.innerHeight + "px";
            this.stopRender();
        }
        this.elem.classList.toggle("clicked");
        this.doc.querySelector(".portfolio").classList.toggle("invis");
        this.doc.body.classList.toggle("bodyclicked");
        this.sliderControlPanel.classList.toggle("cpclicked");
    }
};

Slider.prototype.imgShow = function(index){
    this.elem.setAttribute("src", this.imgPath + this.imgSource[index]);
    this.elem.setAttribute("alt", this.imgAlt[index]);
    this.elem.setAttribute("title", this.title[index]);
    this.href.setAttribute("href", this.imgLink[index]);
    this.titleText.innerText = this.title[index];
};

Slider.prototype.stopRender = function () {
    clearTimeout(this.tOut);
};

Slider.prototype.showNext = function(){
    this.stopRender();
    this.counter = 0;
    this.imgShow(this.index);
    this.render(this.counter);
};

Slider.prototype.render = function (start) {
    this.counter = start || 0;
    if ((this.counter > 0.98) && (this.counter < 1)) {
        this.pause = 0;
    }
    if (this.counter >= 1 && (this.pause == this.pauseValue)) {
        this.show = false;
    }
    if (this.counter < 0) {
        this.show = true;
        this.index = (++this.index > this.maxIndex) ? 0 : this.index;
        this.imgShow(this.index);
    }
    this.counter = (this.show) ? this.counter + 0.01 : this.counter -= 0.01;

    var self = this;
    this.tOut = setTimeout(function () {
        self.elem.style.opacity = self.counter + "";
        self.pause++;
        self.render(self.counter);
    }, this.delay)
};

var imagesList;

var settings = {
    "imgPath": "../img/portfolio/",
    "elem": document.querySelector("#img"),
    "colorDelay": 0.4,
    "bootstrap": true,
    "pause": 80,
    "delay": 15,
    "title": true
};

(function imagesLoad() {
    $.when($.ajax({
        method: "get",
        url: "../json/images.json",
        success: function (images) {
            imagesList = images;
        }
    })).then(function () {
        var slider = new Slider(imagesList, settings);
    })
})();