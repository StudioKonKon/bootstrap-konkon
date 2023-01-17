
function toggleLightMode(e) {
   const light = (document.body.getAttribute("data-bs-theme") == "light")
   document.body.setAttribute("data-bs-theme", (!light ? "light" : "dark"))
   e.stopPropagation()
   e.preventDefault()
}

(() => {
   const node = document.querySelector("#lightmode")
   
   if(node) {
      document.body.setAttribute("data-bs-theme", "light")
      node.addEventListener("click", toggleLightMode)
   }
})();
