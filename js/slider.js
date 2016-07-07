function Slider(images, settings){
        var i = 0;

        //images initialization
        this.imgSource = [];
        this.imgAlt = [];
        this.imgHref = [];
        this.title = [];
        while(images[i + ""]){
                this.imgSource[i] = images[i + ""].name;
                this.imgAlt[i] = images[i + ""].alt;
                this.imgHref[i] = images[i + ""].href;
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

        //internal initialization
        this.pause = 0;
        this.maxIndex = this.imgSource.length - 1;
        this.show = true;
        this.elem.style.opacity = 0;
        this.tOut = setTimeout(function(){}, 0);
        this.pauseClicked = false;
        this.doc = document;
        this.href = this.elem.parentElement;
        this.imgClicked = false;
        this.elemWidth = (settings.bootstrap) ? "100%" : this.elem.style.width;
        this.elemHeight = (settings.bootstrap) ? "100%" : this.elem.style.height;
        this.imgWrapper = this.elem.parentElement.parentElement;

        this.render = this.render.bind(this);
        this.imgShow = this.imgShow.bind(this);
        this.stopRender = this.stopRender.bind(this);
        this.eventListener = this.eventListener.bind(this);
        this.showNext = this.showNext.bind(this);
        this.pauseOff = this.pauseOff.bind(this);
        this.imgClick = this.imgClick.bind(this);

        var controlPanel = this.doc.createElement("div"),
            controls = '<i class="fa fa-arrow-left fa-3x fa_slider" ' +
                'id="sliderprev"></i> &nbsp;&nbsp; <i class="fa fa-pause fa-3x fa_slider" id="sliderpause"></i>' +
                '&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-arrow-right fa-3x fa_slider" id="slidernext" style="margin-right: 100px"></i>'+
                '<button class="btn back" id="back">back</button>',
            controlsStyle = '<style type="text/css">.fa_slider:focus,.fa_slider:hover,.fa_slider:active,' +
                '.pauseActive{color:' + this.controlsActiveColor + ';cursor:pointer}</style>';
        if (this.colorDelay){
                controlsStyle += '<style type="text/css">.fa_slider{-webkit-transition: color ' + this.colorDelay + 's linear ' +
                    this.colorDelay / 2 +'s;-moz-transition: color ' + this.colorDelay + 's linear ' + this.colorDelay / 2 +
                    's;' + '-o-transition: color ' + this.colorDelay + 's linear ' + this.colorDelay / 2 +'s;transition: color ' +
                    this.colorDelay + 's linear ' + this.colorDelay / 2 +'s;</style>';
        }
        controlPanel.style.cssText = "width:" + getComputedStyle(this.elem).width + ";text-align:center;color:" +
                                     this.controlsColor + ";padding:15px;";
        controlPanel.classList.add("row");
        controlPanel.setAttribute("id", "sliderControlPanel");
        controlPanel.insertAdjacentHTML("beforeEnd", controls);
        this.imgWrapper.appendChild(controlPanel);
        this.doc.head.insertAdjacentHTML("beforeEnd", controlsStyle);

        this.pauseButton = this.doc.querySelector("#sliderpause");
        this.sliderControlPanel = this.doc.querySelector("#sliderControlPanel");

        controlPanel.addEventListener("click", this.eventListener);
        this.elem.parentElement.addEventListener("click", this.imgClick);

        this.imgShow(this.index);
        this.render(this.counter);
}

Slider.prototype.imgClick = function(){
        if (!this.imgHref[this.index]){
                event.preventDefault();
                if(this.imgClicked){
                        this.imgClicked = false;
                        this.sliderControlPanel.style.display = "block";
                        this.doc.body.style.overflow = "visible";
                        this.elem.classList.remove("clicked");
                        this.doc.querySelector(".portfolio").classList.remove("invis");
                        this.elem.style.width = this.elemWidth;
                        this.elem.style.height = this.elemHeight;
                        this.render(this.counter);
                } else {
                        this.imgClicked = true;
                        this.elem.style.opacity = 1;
                        this.sliderControlPanel.style.display = "none";
                        this.doc.body.style.overflow = "hidden";
                        this.doc.querySelector(".portfolio").classList.add("invis");
                        this.elem.style.width = window.innerWidth + "px";
                        this.elem.style.height = window.innerHeight + "px";
                        this.elem.classList.add("clicked");
                        this.stopRender();
                }
        }
};

Slider.prototype.showNext = function(){
        this.stopRender();
        this.counter = 0;
        this.imgShow(this.index);
        this.render(this.counter);
};

Slider.prototype.pauseOff = function(render){
        if (this.pauseClicked) {
                this.pauseClicked = false;
                this.pauseButton.classList.remove("pauseActive");
        }
};

Slider.prototype.eventListener = function(event){
        var target = event.target;
        switch(target){
                case(this.doc.querySelector("#sliderprev")):
                        this.pauseOff();
                        this.index = (--this.index < 0) ? this.maxIndex : this.index;
                        this.showNext();
                        break;
                case(this.doc.querySelector("#slidernext")):
                        this.pauseOff();
                        this.index = (++this.index > this.maxIndex) ? 0 : this.index;
                        this.showNext();
                        break;
                case(this.doc.querySelector("#sliderpause")):
                        if (this.pauseClicked){
                                this.pauseOff();
                                this.render(this.counter);
                        } else {
                                this.pauseClicked = true;
                                this.pauseButton.classList.add("pauseActive");
                                this.stopRender();
                        }
                        break;
                case(this.doc.querySelector("#back")):
                        back();
                        break;
                default:
                        return false;
        }
};

Slider.prototype.imgShow = function(index){
        this.elem.setAttribute("src", this.imgPath + this.imgSource[index]);
        this.elem.setAttribute("alt", this.imgAlt[index]);
        this.elem.setAttribute("title", this.title[index]);
        this.href.setAttribute("href", this.imgHref[index]);
};

Slider.prototype.stopRender = function(){
        clearTimeout(this.tOut);
};

Slider.prototype.render = function(start){
        this.counter = start || 0;
        if ((this.counter > 0.98) && (this.counter < 1)){
                this.pause = 0;
        }
        if (this.counter >= 1 && (this.pause == this.pauseValue)) {
                this.show = false;
        }
        if (this.counter < 0){
                this.show = true;
                this.index = (++this.index > this.maxIndex) ? 0 : this.index;
                this.imgShow(this.index);
        }
        this.counter = (this.show) ? this.counter + 0.01 : this.counter -= 0.01;

        var self = this;
        this.tOut = setTimeout(function () {
                self.elem.style.opacity = self.counter + "";
                self.pause ++;
                self.render(self.counter);
        }, this.delay)
};

var imagesList;

var settings = {
        "imgPath" : "../img/portfolio/",
        "elem" : document.querySelector("#img"),
        "colorDelay" : 0.4,
        "bootstrap" : true,
        "pause" : 50,
        "delay" : 30
};

(function imagesLoad(){
        $.when($.ajax({
                method: "get",
                url: "../json/images.json",
                success: function (images) {
                        imagesList = images;
                }
        })).then(function(){
                var slider = new Slider (imagesList, settings);
        })
})();