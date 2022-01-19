const drag = (() => {
    document.addEventListener("dragstart", (event) => {
        event.target.classList.add("dragging");
        document.querySelectorAll(".drop-target").forEach(target => {
            target.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
        })
    });

    document.addEventListener("dragend", (event) => {
        event.target.classList.remove("dragging");
        document.querySelectorAll(".drop-target").forEach(target => {
            target.style.backgroundColor = "rgba(0, 0, 0, 0)";
        })
    });

    document.addEventListener("dragover", (event) => {
        event.preventDefault();
    });

    document.addEventListener("dragenter", (event) => {
        if(event.target.classList.contains("drop-target")) {
            event.target.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
        }
    });

    document.addEventListener("dragleave", (event) => {
        if(event.target.classList.contains("drop-target")) {
            event.target.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
        }
    })


})();

/*
drag events:
dragenter
dragleave
drop


this is my template:

document.addEventListener("dragstart", function( event ) {
    // store a ref. on the dragged elem
    dragged = event.target;
}, false);

document.addEventListener("dragenter", function( event ) {
    // highlight potential drop target when the draggable element enters it
    if ( event.target.className == "dropzone" ) {
        event.target.style.background = "purple";
    }

}, false);

document.addEventListener("dragleave", function( event ) {
    // reset background of potential drop target when the draggable element leaves it
    if ( event.target.className == "dropzone" ) {
        event.target.style.background = "";
    }

}, false);

document.addEventListener("drop", function( event ) {
    // prevent default action (open as link for some elements)
    event.preventDefault();
    // move dragged elem to the selected drop target
    if ( event.target.className == "dropzone" ) {
        event.target.style.background = "";
        dragged.parentNode.removeChild( dragged );
        event.target.appendChild( dragged );
    }
  
}, false);

 from entries:

         entryHolder.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text", entryHolder.id);
        });

        entryHolder.addEventListener("dragend", (event) => {
            if(entryHolder.getAttribute("data-value")) {
                entry.updateTask({ [entryHolder.getAttribute("data-key")]:
                    entryHolder.getAttribute("data-value") });                   
            }
        });

from sidemenu:
        menuOption.addEventListener("drop", (event) => {
            event.preventDefault();
            event.target.classList.remove("drag-over");
            const draggedEntry = 
                document.getElementById(event.dataTransfer.getData("text"));
            draggedEntry.setAttribute("data-key", key);
            draggedEntry.setAttribute("data-value", value);
        });


*/