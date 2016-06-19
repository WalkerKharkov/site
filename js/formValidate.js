var mainForm=document.querySelector("#mainForm");

mainForm.addEventListener("keyup", function(event){
    validator.validate(event.target, event.target.getAttribute("data-attr"));
});

mainForm.addEventListener("submit", submitHandler);

var validator={
	patterns: {
		"name": /\S/,
		"mail": /\b[a-z0-9._]+@[a-z0-9.-]+\.[a-z]{2,6}\b/i,
        "text": /./
    },
    validate: function(elem, attr){
        var pattern=this.patterns[attr],
            res = pattern.test(elem.value);
        if (res === false) {
            if (elem.classList.contains("valid")) elem.classList.remove("valid");
            elem.classList.add("invalid");
        }
        else {
            if (elem.classList.contains("invalid")) elem.classList.remove("invalid");
            elem.classList.add("valid");
        }
    }
};

function submitHandler(event){
    var invalid=false,
        inputs=[].slice.apply(mainForm.querySelectorAll(".form-control"));
    inputs.forEach(function(elem){
        if (!elem.type || elem.type!="text") return;
        validator.validate(elem, elem.getAttribute("data-attr"));
        if (elem.classList.contains("invalid")) invalid=true;
    });
    if (invalid) {
        event.preventDefault();
        return false;
    }
}