/*
* LISTENER
************/



/// ACTION BUTTONS
let saveNoteBtn = document.querySelector('#save-note');
let autoSaveBtn = document.querySelector('#auto-save');
let clearNoteBtn = document.querySelector('#clear-text');

saveNoteBtn.addEventListener("click", saveNote);
autoSaveBtn.addEventListener('click', (e) => {
    toggleAutoSave();
});
clearNoteBtn.addEventListener("click", clearNote);



/// NAV
document.querySelector('#side-nav').addEventListener('click', (e) => {
    const navBtn = e.target.closest('button.side-nav-btn');
    // if navbtn or child was clicked, open subnav
    if (navBtn) {
        // clicked on plus-icon, prepare new note 
        if (navBtn.id === 'new_note') {
            closeSubnav();
            prepForNewNote();
        } else {
            openSubnav(navBtn.id);
        }
    } else {
        // if clicked elem is not a sidenav btn, close subnav
        closeSubnav();
    }
});



/// SUB-NAV
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



/// EDITOR
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



/// AUTO-SAVE
const enableAutoSave = () => {
    // on editor-changes
    app.quill.on('text-change', autoSave);

    // on title-changes
    document.querySelector('#title-input').addEventListener('change', autoSave);
}




/// SEARCH NOTES
document.querySelector('#search-input').addEventListener('keyup', searchNotes);
