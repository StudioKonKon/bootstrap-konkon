// Sidebar
import { default as konkon } from "konkon/js/index.umd.js"

const sidebar = new konkon.Sidebar("#left-sidebar")

function sidebarClose(event) {
   if (typeof sidebar.triggerAutoClose !== "undefined") {
      sidebar.triggerAutoClose(event)
   }
}

document.addEventListener("mousedown", sidebarClose, false)
document.addEventListener("touchstart", sidebarClose, false)

export default sidebar
