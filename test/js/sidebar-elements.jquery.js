"use strict";

(function(window, $, undefined) {

	var sidebar = {};
	
	sidebar.speed = 200;
	sidebar.openClass = "open-left-sidebar";
	sidebar.button = $(document.getElementById("sidebar_btn"));
	sidebar.container = $(document.getElementById("left_sidebar"));
	sidebar.anchors = $(".sidebar-elements li a", sidebar.el);
	sidebar.wrapper = $("> .be-wrapper", document.body);
	sidebar.el = $(".sidebar-elements", sidebar.el);
	
	/** --- **/
	
	function toggle_sidebar() {
		$(document.body).toggleClass(sidebar.openClass);
	}
	
	sidebar.button.on("click", toggle_sidebar);
	
	/** Operate submenus **/
	sidebar.anchors.on("click", function(event){
		var $el = $(this),
			$li = $el.parent(),
			$subMenu = $el.next(),
			$open = $li.siblings(".open");

		if($li.hasClass("open")) {
			slideUp($subMenu, event);
		} else {
			slideDown($el, event);
		}

		if($el.next().is("ul")) {
			event.stopPropagation();
			event.preventDefault();
		}
	});
	
	function isCollapsibleSidebarCollapsed()
	{
		return sidebar.wrapper.hasClass("be-collapsible-sidebar-collapsed");
	}
	
	function slideUp($subMenu, event) {
		var target = $(event.currentTarget),
			parent = $($subMenu).parent(),
			item = $("li.open", parent),
			isRoot = !target.closest(sidebar.container).length,
			hasElements = target.parents().eq(1).hasClass("sidebar-elements");
			
		if(
			!$.isSm() &&
			isCollapsibleSidebarCollapsed() &&
			(hasElements || isRoot)
		) {
			parent.removeClass("open");
			$subMenu.removeClass("visible");
			item.removeClass("open").removeAttr("style");
		} else {
			$subMenu.slideUp({
				duration: sidebar.speed,
				complete: function() {
					parent.removeClass("open");
					$(this).removeAttr("style");
					item.removeClass("open").removeAttr("style");
				}
			});
		}
	}

	function slideDown($this, event) {
		var $el = $($this),
			parent = $el.parent(),
			next = $($el).next(),
			hasElements = $(event.currentTarget).parents().eq(1).hasClass("sidebar-elements"),
			siblingsOpen = parent.siblings(".open");

		if(siblingsOpen) {
			slideUp($("> ul", siblingsOpen), event);
		}

		if(
			!$.isSm() &&
			isCollapsibleSidebarCollapsed() &&
			hasElements
		) {
			parent.addClass("open");
			next.addClass("visible");
		} else {
			next.slideDown({
				duration: sidebar.speed,
				complete: function() {
				parent.addClass("open");
					$(this).removeAttr("style");
				}
			});
		}
	}
	
	/** AUTO close with user clicks or taps away from sidebar **/
	$(document.body).on(
		"mousedown touchstart",
		function(event) {
			if(
				!$(event.target).closest(sidebar.el).length &&
				!$(event.target).closest(sidebar.button).length &&
				$(document.body).hasClass(sidebar.openClass)
			) {
				$(document.body).removeClass(sidebar.openClass);
			}
		}
	);

})(this, jQuery);


/***************************/
/** Bootstrap Breakpoints **/
/***************************/
(function(e){e.isBreakpoint=function(t){var o,i,a;switch(t){case"xs":a="d-none d-sm-block";break;case"sm":a="d-none d-md-block";break;case"md":a="d-none d-lg-block";break;case"lg":a="d-none d-xl-block";break;case"xl":a="d-none"}return i=(o=e("<div/>",{class:a}).appendTo("body")).is(":hidden"),o.remove(),i},e.extend(e,{isXs:function(){return e.isBreakpoint("xs")},isSm:function(){return e.isBreakpoint("sm")},isMd:function(){return e.isBreakpoint("md")},isLg:function(){return e.isBreakpoint("lg")},isXl:function(){return e.isBreakpoint("xl")}})})(jQuery);

