
let noteList = [];
let activeId = false;

// on window load
window.addEventListener("load", function () {
    loadFromLocalStorage();
})

const toggleAutoSave = (btn) => {
    if (btn.innerHTML === 'on') {
        // change status in DOM
        btn.innerHTML = 'off';
        btn.closest('button').classList.remove('autosaveOn');

        // display manual save-btn
        document.querySelector('#save-note').classList.remove('hidden');
    } else {
        // change status in DOM
        btn.innerHTML = 'on';
        btn.closest('button').classList.add('autosaveOn');

        // hide manual save-btn
        document.querySelector('#save-note').classList.add('hidden');
    }
}


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





