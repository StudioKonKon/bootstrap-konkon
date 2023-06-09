/**
 * --------------------------------------------------------------------------
 * Bootstrap: Studio KonKon Theme (v1.4.1): base-component.js
 * Licensed under MIT (https://github.com/StudioKonKon/bootstrap-konkon/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */
// src=bootstrap/js/src/

import BaseComponent from "./base-component.js"
import EventHandler from "./dom/event-handler.js"
import SelectorEngine from "./dom/selector-engine.js"
import Backdrop from "./util/backdrop.js"
import { enableDismissTrigger } from "./util/component-functions.js"
import FocusTrap from "./util/focustrap.js"
import {
   defineJQueryPlugin,
   getUID,
   isDisabled,
   isVisible
} from "./util/index.js"
import ScrollBarHelper from "./util/scrollbar.js"


/**
 * Constants
 */

const VERSION = "1.7.0-beta"

const NAME = "sidebar"
const DATA_KEY = "skk.sidebar"
const EVENT_KEY = `.${DATA_KEY}`
const DATA_API_KEY = ".data-api"
const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`
const ESCAPE_KEY = "Escape"

const CLASS_NAME_ANIMATE = "be-animate"
const CLASS_NAME_OPEN = "open"
const CLASS_NAME_MENU_OPEN = "open"
const CLASS_NAME_MENU_ACTIVE = "active"
const MENU_ITEM_SELECTOR = ".sidebar-elements a"
const MENU_SUB_SELECTOR = ".sub-menu"
const MENU_OPEN_SELECTOR = ".open"
const MENU_ACTIVE_SELECTOR = ".active"
const MENU_ACTIVE_PARENT_SELECTOR = ".sidebar-elements .parent"

const CLASS_NAME_SHOW = "show"
const CLASS_NAME_SHOWING = "showing"
const CLASS_NAME_HIDING = "hiding"
const CLASS_NAME_BACKDROP = "sidebar-backdrop"
const OPEN_SELECTOR = ".sidebar.show"

const EVENT_SHOW = `show${EVENT_KEY}`
const EVENT_SHOWN = `shown${EVENT_KEY}`
const EVENT_HIDE = `hide${EVENT_KEY}`
const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY}`
const EVENT_HIDDEN = `hidden${EVENT_KEY}`
const EVENT_RESIZE = `resize${EVENT_KEY}`
const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`
const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY}`
const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY}`

const EVENT_CLICK_MENU = `click.menu${EVENT_KEY}`

const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="sidebar"]'

const Default = {
   type: "offcanvas",
   animate: true,
   backdrop: false,
   keyboard: true,
   scroll: false
}

const DefaultType = {
   type: "string",
   animate: "boolean",
   backdrop: "(boolean|string)",
   keyboard: "boolean",
   scroll: "boolean"
}

class Sidebar extends BaseComponent {
   constructor(element, config) {
      super(element, config)

      this._isShown = false
      this._component = getUID("sidebar-")

      this._backdrop = this._initializeBackDrop()
      this._focustrap = this._initializeFocusTrap()

      this._element.classList.add(this._component)
      this._addEventListeners()

      if (this._config.animate) {
         document.body.classList.add(CLASS_NAME_ANIMATE)
      }
   }

   // Getters
   static get Default() {
      return Default
   }

   static get DefaultType() {
      return DefaultType
   }

   static get NAME() {
      return NAME
   }

   static get VERSION() {
      return VERSION
   }

   // Public
   toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget)
   }

   show(relatedTarget) {
      if (this._isShown) {
         return
      }

      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW, {
         relatedTarget
      });

      if (showEvent.defaultPrevented) {
         return
      }

      this._isShown = true
      this._backdrop.show()

      if (!this._config.scroll) {
         new ScrollBarHelper().hide()
      }

      this._element.setAttribute("aria-sidebar", true)
      this._element.setAttribute("role", "dialog")
      this._element.classList.add(CLASS_NAME_SHOWING, CLASS_NAME_OPEN)

      const completeCallBack = () => {
         if (!this._config.scroll) {
            this._focustrap.activate()
         }

         this._element.classList.add(CLASS_NAME_SHOW)
         this._element.classList.remove(CLASS_NAME_SHOWING)
         EventHandler.trigger(this._element, EVENT_SHOWN, { relatedTarget })
      };

      this._queueCallback(completeCallBack, this._element, true)
   }

   hide() {
      if (!this._isShown) {
         return
      }

      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE)

      if (hideEvent.defaultPrevented) {
         return
      }

      this._focustrap.deactivate()
      this._element.blur()
      this._isShown = false
      this._element.classList.add(CLASS_NAME_HIDING)
      this._backdrop.hide()

      // ...
      this._element.classList.remove(CLASS_NAME_OPEN)

      const completeCallback = () => {
         this._element.classList.remove(CLASS_NAME_SHOW, CLASS_NAME_HIDING)
         this._element.removeAttribute("aria-sidebar")
         this._element.removeAttribute("role", "dialog")

         if (!this._config.scroll) {
            new ScrollBarHelper().reset()
         }

         EventHandler.trigger(this._element, EVENT_HIDDEN)
      };

      this._queueCallback(completeCallback, this._element, true)
   }

   menuShow(menu) {
      this.menuHideAll(menu.parentElement)
      menu.classList.add(CLASS_NAME_MENU_OPEN)
   }

   menuRemoveActiveAll() {
      this._element
         .querySelectorAll(MENU_ACTIVE_SELECTOR)
         .forEach((item) => item.classList.remove(CLASS_NAME_MENU_ACTIVE))
   }

   menuShowActive(item = this._element.querySelector(MENU_ACTIVE_SELECTOR)) {
      if (item !== null) {
         this.menuHideAll()
         this.menuRemoveActiveAll()

         item.classList.add(CLASS_NAME_MENU_ACTIVE)

         SelectorEngine.parents(
            item,
            MENU_ACTIVE_PARENT_SELECTOR
         ).forEach((menu) => menu.classList.add(CLASS_NAME_MENU_OPEN))
      }
   }

   showActive(item = this._element.querySelector(MENU_ACTIVE_SELECTOR)) {
      item =
         typeof item === "string" ? this._element.querySelector(item) : item

      if (item !== null) {
         this.menuShowActive(item)
      }
   }

   menuHide(menu) {
      menu.classList.remove(CLASS_NAME_MENU_OPEN)
   }

   menuHideAll(menuParent = this._element) {
      menuParent
         .querySelectorAll(MENU_OPEN_SELECTOR)
         .forEach((subMenus) => this.menuHide(subMenus))
   }

   triggerAutoClose(event, conditions = false) {
      // Check if the event is triggered inside a related toggle.
      // If there is no ID, check if it is a sidebar toggle.
      const dataToggle = this._element.hasAttribute("id")
         ? event.target.closest(`[data-bs-target="#${this._element.id}"]`)
         : event.target.closest('[data-bs-toggle="sidebar"]')

      // Check if the event is coming from the sidebar or related
      // toggles and stop them from hiding the sidebar. This also
      // prevents immediate open/close issues.
      if (
         this._element === null ||
         event.target === document ||
         event.target === this._element ||
         this._element.contains(event.target) ||
         (dataToggle !== null && dataToggle.contains(event.target)) ||
         conditions
      ) {
         return;
      }

      this.hide();
   }

   dispose() {
      if (this._element !== null) {
         this._backdrop.dispose()
         this._focustrap.deactivate()
         super.dispose()
      }
   }

   // Private
   _initializeBackDrop() {
      const clickCallback = () => {
         if (this._config.backdrop === "static") {
            EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED)
            return;
         }

         this.hide();
      };

      // "static" option will be translated to true and booleans
      // will keep their value
      const isVisible = Boolean(this._config.backdrop)

      return new Backdrop({
         className: CLASS_NAME_BACKDROP,
         isVisible,
         isAnimated: true,
         rootElement: this._element.parentNode,
         clickCallback: isVisible ? clickCallback : null
      });
   }

   _initializeFocusTrap() {
      return new FocusTrap({
         trapElement: this._element
      });
   }

   _addEventListeners() {
      EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, (event) => {
         if (event.key !== ESCAPE_KEY) {
            return;
         }

         if (!this._config.keyboard) {
            EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED)
            return
         }

         this.hide()
      });

      // click.menu.bs.sidebar
      EventHandler.on(this._element, EVENT_CLICK_MENU, (event) => {
         const item = event.target.closest(MENU_ITEM_SELECTOR)
         const menu = (item !== null && item.parentElement) || null

         if (menu === null) {
            return;
         }

         if (SelectorEngine.children(menu, MENU_SUB_SELECTOR).length > 0) {
            if (["A", "AREA"].includes(item.tagName)) {
               event.preventDefault()
               event.stopPropagation()
            }

            menu.classList.contains(CLASS_NAME_MENU_OPEN)
               ? this.menuHide(menu)
               : this.menuShow(menu)
         } else {
            this.menuHideAll(menu.parentElement)
         }
      });
   }

   // Static
   static jQueryInterface(config) {
      return this.each(function () {
         const data = Sidebar.getOrCreateInstance(this, config)

         if (typeof config !== "string") {
            return
         }

         if (
            data[config] === undefined ||
            config.startsWith("_") ||
            config === "constructor"
         ) {
            throw new TypeError(`No method named "${config}"`)
         }

         data[config](this)
      });
   }
}

/**
 * Data API implementation
 */

EventHandler.on(
   document,
   EVENT_CLICK_DATA_API,
   SELECTOR_DATA_TOGGLE,
   function (event) {
      const target = SelectorEngine.getElementFromSelector(this)

      if (["A", "AREA"].includes(this.tagName)) {
         event.preventDefault()
      }

      if (isDisabled(this)) {
         return
      }

      EventHandler.one(target, EVENT_HIDDEN, () => {
         // focus on trigger when it is closed
         if (isVisible(this)) {
            this.focus()
         }
      });

      // avoid conflict when clicking a toggler of a sidebar, while another is open
      const alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR);

      if (alreadyOpen && alreadyOpen !== target) {
         Sidebar.getInstance(alreadyOpen).hide()
      }

      const data = Sidebar.getOrCreateInstance(target)
      data.toggle(this)
   }
);

EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
   for (const selector of SelectorEngine.find(OPEN_SELECTOR)) {
      Sidebar.getOrCreateInstance(selector).show()
   }
});

enableDismissTrigger(Sidebar)

/**
 * jQuery
 */

defineJQueryPlugin(Sidebar)

export default Sidebar
