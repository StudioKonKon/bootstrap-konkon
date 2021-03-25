"use strict";
(function() {

	var toast_wrapper = document.querySelector("#toast_wrapper"),
		toastPositions = {
			"tl": { value: "top-0 start-0", title: "Top Left" },
			"tm": { value: "top-0 start-50 translate-middle-x", title: "Top Middle" },
			"tr": { value: "top-0 end-0", title: "Top Right" },
			"ml": { value: "top-50 start-0 translate-middle-y", title: "Middle Left" },
			"mm": { value: "top-50 start-50 translate-middle", title: "Middle Middle" },
			"mr": { value: "top-50 end-0 translate-middle-y", title: "Middle Right" },
			"bl": { value: "bottom-0 start-0", title: "Bottom Left" },
			"bm": { value: "bottom-0 start-50 translate-middle-x", title: "Bottom Middle" },
			"br": { value: "bottom-0 end-0", title: "Bottom Right" }
		},
		html = '<div class="toast-header"><svg class="bd-placeholder-img rounded-circle me-2" width="15" height="15" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img"><rect width="100%" height="100%" fill="#4285f4"></rect></svg><strong class="me-auto">Bootstrap</strong><small>11 mins ago</small><button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button></div><div class="toast-body">Hello, world! This is a toast message.</div>',
		dynList = [];
	
	function addToast() {
		var toast = document.createElement("div");
			toast.className = "toast fade";
			toast.setAttribute("role", "alert");
			toast.setAttribute("aria-live", "assertive");
			toast.setAttribute("aria-atomic", "true");
			toast.innerHTML = html;
		
		toast_wrapper.appendChild(toast);
		
		toast = new bootstrap.Toast(toast, {
			"autohide": true,
			"delay": 5000
		});
		
		toast.show();
	}
	
	function changePosition(position) {
		toast_wrapper.className = "toast-container position-fixed " + toastPositions[position].value;
	}
	
	document.querySelectorAll("#examplejs button").forEach(function(button) {
		button.addEventListener("click", function(e) {
			var $action = this.getAttribute("data-action");
			
			switch($action) {
				case "add": addToast(); break;
				default: changePosition($action); break;
			}
			
		}, false);
	});
		
})();


