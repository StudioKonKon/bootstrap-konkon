// TODO:
//   [/] - Sidebar object/init
//   [/] - Sidebar open/close events
//   [/] - Sidebar toggle events
//   [/] - Menu toggle events
//   [/] - Fix parent menu falsely closing (look again at jQuery code then re-translate)
//   [ ] - Add auto open on submenus for the first found active item.



(function(global, factory) {

   typeof(exports) === "object" && typeof(module) !== "undefined" ? module.exports = factory() :
   typeof(define) === "function" && define.amd ? define(factory) : (
      global = typeof(globalThis) !== "undefined" ? globalThis :
      global || self, global.Sidebar = factory()
   );

}(this, (function() {
   "use strict";

   var defaultClasses = {
      "version": "1.1.2",
      "bootstrap-version": "5.1.0",
      "sidebar": "be-left-sidebar",
      "animate": "be-animate",
      "offcanvas": "be-offcanvas-menu",
      "open": "open",
      "toggle": "be-toggle-left-sidebar",
      "component": "",
      "elements": "sidebar-elements",
      "wrapper": "be-wrapper",
      "collapsed": "be-collapsible-sidebar-collapsed",
      "parent": "li",
      "submenu": "ul"
   };
   
   var defaultOptions = {
      "type": "fixed",
      "animate": true
   };

   // While Math.random() may have a high chance of producing 
   // duplicates, we are not using it for databases.
   // For our usage, it's unlikely to cause any conflicts.
   function uid(seperator) {
      return [
         "s",
         Date.now().toString(36),
         Math.random().toString(36).substring(2)
      ].join(seperator ? seperator : "");
   }

   // Our main function for creating the Sidebar
   function _Sidebar(selector, obj, options) {
      var dbcl = document.body.classList;
      
      obj = (typeof(obj) === "object") ? obj : {};
      options = (typeof(options) === "object") ? options : {};
      this.sidebar = document.querySelector(selector);
      this.classes = {};
      this.isOpen = false;

      if(!this.sidebar) {
         throw new Error("No sidebar found");
         return;
      }

      // here, default classes can be overridden
      this.classes = Object.assign({}, defaultClasses, obj);
      this.options = Object.assign({}, defaultOptions, options);

      // The sidebar and buttons need a parent class
      // to prevent sidebar from closing but also prevent
      // toggles from responing twice (i.e: immediate open/close)
      if(this.classes.component == "") {
         this.classes.component = "sk-sidebar-" + uid();
      }

      this.sidebar.classList.add(this.classes.component);
      this.isOpen = this.sidebar.classList.contains(this.classes.open);
      
      if(this.options.animate) {
         dbcl.add(this.classes.animate);
      }

      return this.init();
   }

   // ----- functions

   // start by creating the relevent event listeners
   // and other options
   function init() {

      // bind $this to events
      this.events.open = this.open.bind(this);
      this.events.close = this.close.bind(this);
      this.events.toggle = this.toggle.bind(this);
      this.events.menuToggle = this.menuToggle.bind(this);

      // Add event listeners
      this.sidebar.addEventListener("click", this.events.menuToggle, false);
      document.addEventListener("mousedown", this.events.close, false);
      document.addEventListener("touchstart", this.events.close, false);

      return this;
   }

   // START: sidebar events
   function close(event) {
      if(
         typeof(event) == "undefined" ||
         !event.target.closest("." + this.classes.component)
      ) {
         this.sidebar.classList.remove(this.classes.open);
         this.isOpen = false;
      }
   }

   function open() {
      this.sidebar.classList.add(this.classes.open);
      this.isOpen = true;
   }

   function toggle(event) {
      if(event) {
         event.preventDefault();
         event.stopPropagation();
      }
      
      this.isOpen = this.sidebar.classList.toggle(this.classes.open);
   }
   // END: sidebar events


   // START: sidebar menu events
   // TODO: 2021.09.07 currently testing
   function menuToggle(event) {
      var $el = event.target.closest("a"),
          $li = $el && $el.parentElement || null,
          $subMenu = $li && $li.querySelector(":scope > ul") || null;
      
      if(!$li) { return; }
      
		if($subMenu) {
			event.stopPropagation();
			event.preventDefault();
		}

      !$li.classList.contains("open") ? 
         this.menuOpen($li, $subMenu) : this.menuClose($li);
   }

   function menuOpen($li, $subMenu) {
      var $this = this,
          parent = $li.parentElement,
          itemsOpen = parent && parent.querySelectorAll("li.open") || [];
      
      itemsOpen.forEach(this.menuClose);
      
      $subMenu && $li.classList.add("open");
   }

   function menuClose($li) {
      $li.classList.remove("open");
   }
   // END: sidebar menu events

   // A way of capturing events for interacting with the sidebar
   function createToggle(selector) {
      var element = document.querySelector(selector);

      if(element) {
         // prevent propagation issues with our $document events
         element.classList.add(this.classes.component);
         element.addEventListener("click", this.events.toggle, false);
         this.userToggles.push(element);
      }

      return {
         element: element,
         sidebar: this
      };
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

   // Clear all events and references associated with
   // our sidebar component. Any created objects will need to be
   // cleared seperately for proper garbage collection.
   function destroy() {
      var $this = this,
          userToggles = this.userToggles;


      this.sidebar.removeEventListener("click", this.events.menuToggle, false);
      document.removeEventListener("mousedown", this.events.close, false);
      document.removeEventListener("touchstart", this.events.close, false);

      this.userToggles.forEach(function(element) {
         if(element) {
            element.removeEventListener("click", $this.events.toggle, false);
         }
      });

      this.sidebar = null;
      this.userToggles = [];
      this.events = {};

      return;
   }

   // prototypes
   _Sidebar.prototype.userToggles = [];
   _Sidebar.prototype.events = {};

   _Sidebar.prototype.init = init;
   _Sidebar.prototype.open = open;
   _Sidebar.prototype.close = close;
   _Sidebar.prototype.toggle = toggle;
   _Sidebar.prototype.menuOpen = menuOpen;
   _Sidebar.prototype.menuClose = menuClose;
   _Sidebar.prototype.menuToggle = menuToggle;
   _Sidebar.prototype.createToggle = createToggle;

   _Sidebar.prototype.destroy = destroy;

   return _Sidebar;

})));
