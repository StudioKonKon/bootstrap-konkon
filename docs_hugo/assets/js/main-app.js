"use strict";

import { default as konkon } from "konkon/js/index.umd.js"
import { global } from "./main-lib/global"
import sidebar from "./main-lib/sidebar.setup"


function toggleLightMode(e) {
   const light = (document.documentElement.getAttribute("data-bs-theme") == "light")
   document.documentElement.setAttribute("data-bs-theme", (!light ? "light" : "dark"))
   e.stopPropagation()
   e.preventDefault()
}

(() => {
   const node = document.querySelector("#lightmode")
   
   if(node) {
      document.documentElement.setAttribute("data-bs-theme", "light")
      node.addEventListener("click", toggleLightMode)
   }
})();


// Global exports
global.app = {
   sidebar
}

global.konkon = konkon
