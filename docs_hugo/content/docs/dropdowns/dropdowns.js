"use strict";
(function() {
	var $html = document.querySelector("html"),
		forms = [];
	
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
	
})();
