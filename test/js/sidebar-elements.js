
/**
   TODO: Add possible animations
   TODO: Fix sticky menu closing
   CHANGES: Dropped support for IE
**/

//var rootElement = element ? this._getRootElement(element) : this._element;

var Sidebar = (function (self) {
   var NAME = "Sidebar",
       VERSION = "0.4.3-beta",
       BOOTSTRAP_VERSION = "5.0.0-alpha1",
       DATA_KEY = "skk.sidebar",
       CLASSNAME_SIDEBAR = "be-left-sidebar",
       CLASSNAME_SIDEBAR_ANIMATE = "be-animate",
       CLASSNAME_SIDEBAR_OFFCANVAS = "be-offcanvas-menu",
       CLASSNAME_SIDEBAR_OPEN = "open-left-sidebar",
       CLASSNAME_SIDEBAR_TOGGLE = "be-toggle-left-sidebar",
       CLASSNAME_SIDEBAR_COMPONENT = "component-left-sidebar",
       CLASSNAME_SIDEBAR_ELEMENTS = "sidebar-elements";
   
   function Sidebar(obj) {
      var _element, _button;
      
      obj = typeof(obj) === "object" ? obj : {};

      _element = typeof(obj.el) !== "undefined" ?
         obj.el : document.querySelector("." + CLASSNAME_SIDEBAR);

      _button = typeof(obj.button) !== "undefined" ?
         obj.button : document.querySelector("." + CLASSNAME_SIDEBAR_TOGGLE);

      this._element = _element;
      this._button = _button;
      
      this._element.classList.add(CLASSNAME_SIDEBAR_COMPONENT);
      this._button.classList.add(CLASSNAME_SIDEBAR_COMPONENT);
      document.body.classList.add(CLASSNAME_SIDEBAR_ANIMATE, CLASSNAME_SIDEBAR_OFFCANVAS);
      
      this._button.addEventListener("click", this.toggle, false);
      this._element.addEventListener("click", this.menuToggle, false);
      document.body.addEventListener("mousedown", this.close, false);
      document.body.addEventListener("touchstart", this.close, false);
   }

   var _proto = Sidebar.prototype;

   _proto.toggle = toggle;
   _proto.close = close;
   _proto.menuToggle = menuToggle;
   _proto.menuOpen = menuOpen;
   _proto.menuClose = menuClose;
   _proto.destroy = destroy;
   _proto._getRootElement = _getRootElement;
   _proto._isCollapsibleSidebarCollapsed = _isCollapsibleSidebarCollapsed

   // Sidebar fn
	function close(event) {
		if(
			!event.target.closest("." + CLASSNAME_SIDEBAR_COMPONENT) &&
			document.body.classList.contains(CLASSNAME_SIDEBAR_OPEN)
		) {
			document.body.classList.remove(CLASSNAME_SIDEBAR_OPEN);
		}
	}
   
   function toggle(element) {
      document.body.classList.toggle(CLASSNAME_SIDEBAR_OPEN);
   }
   
   function menuToggle(event) {
      var parent = event.target.closest("li"),
          subMenu = parent.querySelector(":scope > ul");
      
      if(!!subMenu) {
			event.stopPropagation();
			event.preventDefault();
		}
      
      if(parent.classList.contains("open")) {
         menuClose(parent, subMenu, event);
      } else {
         menuOpen(parent, subMenu, event);
      }
   }
   
   function menuOpen(parent, subMenu, event) {
      var hasElements = parent.parentElement.classList.contains(CLASSNAME_SIDEBAR_ELEMENTS),
          siblingsOpen = parent.parentElement.querySelectorAll(".open"),
          siblingMenus,
          i1 = 0,
          l1 = siblingsOpen.length,
          i2 = 0,
          l2 = 0;
      
      if(l1 > 0) {
         for(i1 = 0; i1 < l1; i1++) {
            siblingMenus = siblingsOpen[i1].querySelectorAll(":scope > ul");
            l2 = siblingMenus.length;
            
            for(i2 = 0; i2 < l2; i2++) {
               menuClose(siblingsOpen[i1], siblingMenus[i2], event);
            }
         }
      }
      
      if(
         !breakpointSmall() &&
         _isCollapsibleSidebarCollapsed() &&
         hasElements
      ) {
         parent.classList.add("open");
         subMenu && subMenu.classList.add("visible");
      } else {
         // TODO: Animation "slideDown"
         parent.classList.add("open");
         subMenu && subMenu.removeAttribute("style");
      }
   }
   
   function menuClose(parent, subMenu, event) {
      var item = parent.querySelectorAll("li.open"),
          isRoot = parent.closest("." + CLASSNAME_SIDEBAR),
          hasElements = parent.parentElement.classList.contains(CLASSNAME_SIDEBAR_ELEMENTS),
          i = 0,
          l = item.length;
      
      if(
         !breakpointSmall() &&
         _isCollapsibleSidebarCollapsed() &&
         (hasElements || isRoot)
      ) {
         parent.classList.remove("open");
         subMenu && subMenu.classList.remove("visible");
         
         for(i = 0; i < l; i++) {
            item[i] && item[i].classList.remove("open");
            item[i] && item[i].removeAttribute("style");
         }
      } else {
         // TODO: Animation "slideUp"
         parent.classList.remove("open");
         subMenu && subMenu.removeAttribute("style");

         for(i = 0; i < l; i++) {
            item[i] && item[i].classList.remove("open");
            item[i] && item[i].removeAttribute("style");
         }
      }
   }
   
   function destroy() {
      this._button.removeEventListener("click", this.toggle, false);
      this._element.removeEventListener("click", this.menuToggle, false);
      document.body.removeEventListener("mousedown", this.close, false);
      document.body.removeEventListener("touchstart", this.close, false);
      this._element.classList.remove(CLASSNAME_SIDEBAR_COMPONENT);
      this._button.classList.remove(CLASSNAME_SIDEBAR_COMPONENT);
      this._element = null;
      this._button = null;
   }

   function _getRootElement(element) {
      return (
         getElementFromSelector(element) ||
         element.closest("." + CLASSNAME_SIDEBAR)
      );
   }
   
   function _isCollapsibleSidebarCollapsed() {
      var wrapper = document.querySelector(".be-wrapper");
      
      if(wrapper) {
         return wrapper.classList.contains("be-collapsible-sidebar-collapsed");
      }
      
      return false;
   }

   // Misc.
   function getSelector(element) {
      var selector = element.getAttribute("data-target");

      if (!selector || selector === "#") {
         var hrefAttr = element.getAttribute("href");
         selector = hrefAttr && hrefAttr !== "#" ? hrefAttr.trim() : null;
      }

      return selector;
   }

   function getElementFromSelector(element) {
      var selector = getSelector(element);
      return selector ? document.querySelector(selector) : null;
   }
   
   function breakpointSmall() {
      var element,
          visible;

      element = document.createElement("div");
      element.className = "d-none d-md-block";
      document.body.appendChild(element);
      visible = !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length)
      document.body.removeChild(element);

      return visible;
   }

   return Sidebar;
})(this);

var mySidebar = new Sidebar();
