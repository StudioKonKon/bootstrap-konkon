
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
