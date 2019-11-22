
let noteList = [];
let activeId = false;

// on window load
window.addEventListener("load", function () {
    loadFromLocalStorage();
})




/*
 * Popup
 ***********/

/*(() => { // Runs directly in local scope
    // show welcome popup?
    const popup = document.querySelector(".popup");
    const blur = document.querySelector(".blur");
    const visited = isStored('myNotes'); // Check if first time user (previously stored notes)
    //
    const welcome = () => {
        if (!visited) {
            popup.classList.remove("hidden");
            blur.classList.remove("hidden");
        }
    }
    welcome();
})(); // local scope*/





