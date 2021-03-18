"use strict";
(function() {
	var $html = document.querySelector("html");
	
	document
		.querySelectorAll(".modal")
		.forEach(function(modals) {
			modals.addEventListener("show.bs.modal", function() {
				$html.classList.add("be-modal-open");
			});
			
			modals.addEventListener("hidden.bs.modal", function() {
				$html.classList.remove("be-modal-open");
			});
		});
	
})();
