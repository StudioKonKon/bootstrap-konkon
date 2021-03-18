"use strict";
(function() {
	var $html = document.querySelector("html"),
		forms = [];
	
	document
		.querySelectorAll(".be-content .main-content form")
		.forEach(function(forms) {
			forms.setAttribute("action", location.href + "#");
			forms.addEventListener("submit", function(e) {
				e.preventDefault();
				return false;
			});
		});
	
	document
		.querySelectorAll(".be-content .main-content a.dropdown-item")
		.forEach(function(links) {
			links.addEventListener("click", function (event) {
				event.preventDefault();
			});
		});
	
	forms = document.querySelectorAll('.be-content .needs-validation')

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
	
})();
