"use strict";
(function() {
	document.querySelectorAll(".be-content .main-content .lbl-tooltip-example")
		.forEach(function(tooltip) {
			tooltip.setAttribute("data-bs-toggle", "tooltip");
			tooltip.setAttribute("title", "Tooltip Example");
			
			tooltip.removeEventListener("click", function(e) {
				e.preventDefault();
				e.stopPropagation();
			}, false);
		});
		
	document.querySelectorAll(".be-content .main-content .lbl-popover-example")
		.forEach(function(popover) {
			popover.setAttribute("data-bs-toggle", "popover");
			popover.setAttribute("data-bs-content", "Vis te sonet civibus convenire, id has eius dicant vidisse.");
			popover.setAttribute("title", "Popover Example");
			
			popover.removeEventListener("click", function(e) {
				e.preventDefault();
				e.stopPropagation();
			}, false);
		});
})();