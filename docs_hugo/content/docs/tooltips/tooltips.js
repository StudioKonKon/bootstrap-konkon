"use strict";
(function() {
	document.querySelectorAll(".be-content .main-content .lbl-tooltip-example")
		.forEach(function(tooltip) {
			tooltip.setAttribute("data-bs-toggle", "tooltip");
			tooltip.setAttribute("title", "Tooltip Example");
			
			tooltip.addEventListener("click", function(e) {
				e.preventDefault();
				e.stopPropagation();
			}, false);
			
			//new bootstrap.Tooltip(tooltip);
		});
		
	document.querySelectorAll(".be-content .main-content .lbl-popover-example")
		.forEach(function(popover) {
			popover.setAttribute("data-bs-toggle", "popover");
			popover.setAttribute("data-bs-content", "Vis te sonet civibus convenire, id has eius dicant vidisse.");
			popover.setAttribute("title", "Popover Example");
			
			popover.addEventListener("click", function(e) {
				e.preventDefault();
				e.stopPropagation();
			}, false);
			
			//new bootstrap.Popover(popover);
		});
	
	var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
	var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
		return new bootstrap.Tooltip(tooltipTriggerEl);
	});
	
	var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
	var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
		return new bootstrap.Popover(popoverTriggerEl, { trigger: "focus" });
	});
	
})();