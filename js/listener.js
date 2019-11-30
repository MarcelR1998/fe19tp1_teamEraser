// ACTION BUTTONS
let saveNoteBtn = document.querySelector('#save-note');
let autoSaveBtn = document.querySelector('#auto-save');
let clearNoteBtn = document.querySelector('#clear-text');

saveNoteBtn.addEventListener("click", saveNote);
autoSaveBtn.addEventListener('click', (e) => {
    toggleAutoSave();
});
clearNoteBtn.addEventListener("click", clearNote);


// SIDE-NAV-BUTTONS
document.querySelector('#side-nav').addEventListener('click', (e) => {
    const btn = e.target.closest('button.side-nav-btn');
    // if sidenav btn or child was clicked, open subnav
    if (btn) {
        // clicked on plus-icon, prepare new note 
        if (btn.id === 'new_note') {
            closeSubnav();
            prepForNewNote();
        } else {
            openSubnav(btn.id);
        }
    } else {
        // if clicked elem is not a sidenav btn, close subnav
        closeSubnav();
    }
});

// SIDE-SUBNAV
document.querySelector('#side-subnav').addEventListener('click', (e) => {
    // close subnav on click anywhere but:
    // favStar
    if (e.target.classList.contains('favoriteNote')) {
        updateFavStatus(e.target.closest('li').dataset.noteId);
        // delete btn
    } else if (e.target.classList.contains("deleteNote")) {
        deleteNote(Number(e.target.closest('li').dataset.noteId));
    } else if (e.target.id === 'search-input') {
        console.log('ready to search...');
    } else {
        closeSubnav();
    }
});

// EDITOR
document.querySelector('#editorContainer').addEventListener('click', (e) => {
    // if subnav is open, close it
    closeSubnav();
});

// BOTTOM-BUTTONS
document.querySelector('#bottom-buttons').addEventListener('click', (e) => {
    // clear storage? (temp dev func)
    if (e.target.id == 'clearStorage') {
        //clear LS
        localStorage.clear();
        // update noteList
        loadFromLocalStorage();
        //display msg below
        displayMsg('Storage cleared!');
    }
});


// AUTO-SAVE
// on editor-changes
quill.on('text-change', function (delta, oldDelta, source) {
    autoSave();
});
// on title-changes
document.querySelector('#title-input').addEventListener('change', autoSave);


// SEARCH NOTES
document.querySelector('#search-input').addEventListener('keyup', searchNotes);


/*
// old...
// DOCUMENT CLICK-LISTENER
document.addEventListener("click", function (e) {
    // close welcome popup?
    if (e.target.id === 'closeWelcome') {
        e.target.parentElement.classList.add("invisible");
    }


    // nav?
    const subnav = document.querySelector('#side-subnav');
    /*
    if (e.target.parentElement.classList.contains('button-sidebar')) {
        openSubnav(e);
    }

    // checks for if user clicked outside of icon, but still within button. Has related function in interaction.js.
    else if (e.target.classList.contains('button-sidebar')) {
        openSubnav2(e);

        // if not nav/subnav, but subnav is open, close subnav
    } else if (e.target !== subnav && !subnav.contains(e.target)) {
        if (this.querySelector('#side-subnav').dataset.open) {
            closeSubnav();
        }
    }
    // subnav closebtn?
    if (e.target.classList.contains('closebtn') && e.target.parentElement.id == 'side-subnav') {
        closeSubnav();
    }
    */
/*
// load note? (make this smarter?)

if (e.target.classList.contains('note') && e.target.dataset.id) {
    loadNote(e.target.dataset.id);
} else if (e.target.parentElement.classList.contains('note') && e.target.parentElement.dataset.id) {
    loadNote(e.target.parentElement.dataset.id);
} else if (e.target.parentElement.parentElement.classList.contains('note') && e.target.parentElement.parentElement.dataset.id) {
    loadNote(e.target.parentElement.parentElement.dataset.id);
}
});


// Skapa ny note??
//document.querySelector('#new_note').addEventListener('click', function () { newNote(); });
*/
