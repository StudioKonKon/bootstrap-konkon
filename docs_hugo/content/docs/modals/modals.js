"use strict";
(function() {
	var $html = document.querySelector("html");
	
	document
		.querySelectorAll(".modal")
		.forEach(function(modals) {
			modals.addEventListener("show.bs.modal", function() {
				$html.classList.add("sk-modal-open");
			});
			
			modals.addEventListener("hidden.bs.modal", function() {
				$html.classList.remove("sk-modal-open");
			});
		});
	
})();
