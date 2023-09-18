"use strict";
(function() {
	var $html = document.querySelector("html"),
		forms = [],
		inputFile = [];
	
	document
		.querySelectorAll(".sk-content .main-content form")
		.forEach(function(forms) {
			forms.setAttribute("action", location.href + "#");
			forms.addEventListener("submit", function(e) {
				e.preventDefault();
				return false;
			});
		});
	
	document
		.querySelectorAll(".sk-content .main-content a.dropdown-item")
		.forEach(function(links) {
			links.addEventListener("click", function (event) {
				event.preventDefault();
			});
		});
	
	forms = document.querySelectorAll(".sk-content .needs-validation");

	Array.prototype.slice.call(forms)
		.forEach(function (form) {
			form.addEventListener("submit", function (event) {
				if (!form.checkValidity()) {
					event.preventDefault();
					event.stopPropagation();
				}

				form.classList.add("was-validated");
			}, false)
		});
	
	inputFile = document.querySelectorAll(".input-file");

	Array.prototype.slice.call(inputFile)
		.forEach(function (input) {
			var label = input.previousElementSibling,
				defaultLabel = "Choose file(s)...";
			
			if (
				!label ||
				!label.classList.contains("input-file-label") &&
				!(input.name == label.id)
			) {
				label = input.nextElementSibling;
				
				if (
					!label ||
					!label.classList.contains("input-file-label") &&
					!(input.name == label.id)
				) {
					return;
				}
			}
			
			label = label.querySelector(".input-file-text") || label;
			
			if(!label.getAttribute("data-default-text")) {
				label.setAttribute("data-default-text", label.textContent);
			}
			
			input.addEventListener("change", function(e) {
				var count = label.getAttribute("data-default-text"),
					text = "";
				
				if(typeof(this.files) === "object") {
					if(this.files.length > 1) {
						count = (input.getAttribute("data-multiple-caption") || "").replace("{count}", this.files.length);
					} else if(input.value) {
						count = input.value.split("\\").pop();
					}
				}
				
				label.innerHTML = count;
			});
		});
	
	
	
})();
