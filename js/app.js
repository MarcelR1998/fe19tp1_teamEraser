
let noteList = [];
let activeId = false;

// on window load
window.addEventListener("load", function () {
    loadFromLocalStorage();
})


// AUTO-SAVE
const toggleAutoSave = () => {
    let status = document.querySelector('#auto-save span.status');
    if (autosaveStatus()) {
        // change status in DOM
        status.innerHTML = 'off';
        status.closest('button').classList.remove('autosaveOn');

        // display manual save-btn
        document.querySelector('#save-note').classList.remove('hidden');
    } else {
        // change status in DOM
        status.innerHTML = 'on';
        status.closest('button').classList.add('autosaveOn');

        // hide manual save-btn
        document.querySelector('#save-note').classList.add('hidden');
    }
}

const autosaveStatus = () => {
    const status = (document.querySelector('#auto-save span.status').innerHTML === 'on')
        ? true : false;
    return status;
}

const autoSave = () => {
    // bail if:

    // ...autosave is off
    if (!autosaveStatus()) {
        return;
    }

    // ...new note is empty
    if (!activeId && quill.getLength() < 2) {
        return;
    }

    saveNote();
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

let visitIndex;

if(!localStorage.getItem("visitIndex")){
    document.querySelector(".popup").classList.remove("invisible");
    document.querySelector(".blur").classList.remove("invisible");
    localStorage.setItem("visitIndex", "visited");
}

document.addEventListener("click", function (e) {
    // close welcome popup?
    if (e.target.id === 'closeWelcome') {
        e.target.parentElement.classList.add("invisible");
        document.querySelector(".blur").classList.add("invisible");
    }}
)