// Function taken from w3schools modified for tactil events

export default {
  methods: {
    dragElement(elmnt, maxHeight, maxWidth, elmntheight, elmntWidth) {
      var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
      elmnt.onmousedown = dragMouseDown;
      elmnt.ontouchstart = dragTouchDown;
  
      // Mouse logic
      function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
      }

      // Tactil logic
      function dragTouchDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the touch position at startup:
        pos3 = e.touches[0].screenX;
        pos4 = e.touches[0].screenY;
        document.ontouchend = closeDragElement;
        // call a function whenever the touch moves:
        document.ontouchmove = elementDrag;
      }
    
      function elementDrag(e) {
        e = e || window.event;
        if (e.type === "touchmove") {
          pos1 = pos3 - e.touches[0].screenX;
          pos2 = pos4 - e.touches[0].screenY;
          pos3 = e.touches[0].screenX;
          pos4 = e.touches[0].screenY;
        } else {
          e.preventDefault();
          pos1 = pos3 - e.clientX;
          pos2 = pos4 - e.clientY;
          pos3 = e.clientX;
          pos4 = e.clientY;
        }

        if(elmnt.offsetTop - pos2 <= 0 ){
          elmnt.style.top = 0 + "px";
        } else if (elmnt.offsetTop - pos2 >= maxHeight - elmntheight) {
          elmnt.style.top = (maxHeight - elmntheight) + "px";
        } else {
          elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        }

        if(elmnt.offsetLeft - pos1 <= 0 ){
          elmnt.style.left = 0 + "px";
        } else if (elmnt.offsetLeft - pos1 >= maxWidth - elmntWidth) {
          elmnt.style.left = (maxWidth - elmntWidth) + "px";
        } else {
          elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

      }
    
      function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.ontouchend = null;
        document.onmousemove = null;
        document.ontouchmove = null;
      }
    }
  }
}


