/*
* LISTENER
************/




/// ACTION BUTTONS
//let saveNoteBtn = document.querySelector('#save-note');
let autoSaveBtn = document.querySelector('#auto-save');
let clearNoteBtn = document.querySelector('#clear-text');

/*saveNoteBtn.addEventListener("click", saveNote);
autoSaveBtn.addEventListener('click', (e) => {
    toggleAutoSave();
});*/

clearNoteBtn.addEventListener("click", clearNote);

const applyEars = () => {

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

        // hide delete popup, if already up
        if (app.state.deleteRequested && app.state.activeSubnav !== 'settings') {
            document.querySelector(`#note-${app.state.deleteRequested} .deletePopup`).classList.add('invisible');
        }

        if (e.target.classList.contains('favoriteNote')) {
            updateFavStatus(e.target.closest('li.note').dataset.noteId);

            // delete btn
        } else if (e.target.classList.contains("deleteNote")) {
            // display delete popup for clicked note
            let noteId = e.target.closest('li.note').dataset.noteId;
            document.querySelector(`#deletePopup-${noteId}`).classList.remove('invisible');

            // update delete requested id
            app.state.deleteRequested = noteId;

            // confirm delete
        } else if (e.target.classList.contains('confirmDelete')) {
            // get note to delete and note to load after    
            let deleteID = Number(e.target.closest('li.note').dataset.noteId);

            let domIDs = (() => {
                let nodes = document.querySelectorAll('li.note');
                let res = [];
                nodes.forEach((node, nth) => {
                    res.push(Number(node.dataset.noteId));
                });
                return res;
            })();

            // if exists, get next or prev note in DOM
            let noteToLoad = domIDs[(domIDs.indexOf(deleteID)) + 1]
                || domIDs[(domIDs.indexOf(deleteID)) - 1]
                || false;

            // delete note
            deleteNote(deleteID);
            app.state.deleteRequested = false;

            // load next/prev note in list if exists, else prep for new
            if (noteToLoad) {
                loadNote(noteToLoad)
            } else {
                prepForNewNote();
            }

            //cancel delete
        } else if (e.target.classList.contains('cancelDelete')) {
            let noteId = e.target.closest('li.note').dataset.noteId;
            document.querySelector(`#deletePopup-${noteId}`).classList.add('invisible');
            app.state.deleteRequested = false;

            // settings-toggle
        } else if (e.target.closest('label.settingsToggle') != null) {
            if (e.target.classList.contains('settingsSwitch')) {
                if (e.target.id === 'autoSave') {
                    autosaveToggle();
                } else if (e.target.id === 'darkMode') {
                    darkModeToggle();
                }
            }

            // search
        } else if (e.target.id === 'search-input') {
            // search...

            // else close subnav
        } else {
            closeSubnav();
            app.state.deleteRequested = false;
        }
    });


    /// NOTE TITLE
    document.querySelector('#title-input').addEventListener('click', (e) => {
        if (e.target.innerHTML.length < 1) {
            e.target.setAttribute('placeholder', '');
        }
    });

    document.querySelector('#title-input').addEventListener('focusout', (e) => {
        if (e.target.innerHTML.length < 1) {
            e.target.setAttribute('placeholder', 'Nameless document...');
        }
    });

    document.querySelector('#title-input').addEventListener('keyup', (e) => {
        // on enter focus on editor field
        if (e.keyCode === 13) {
            document.querySelector('#editor .ql-editor').focus();
        }
    });


    /// EDITOR
    document.querySelector('#editorContainer').addEventListener('click', (e) => {
        // if subnav is open, close it
        closeSubnav();
    });

    // DYNAMIC EDITOR HEIGHT
    window.onresize = (e) => {
        updateEditorHeight();
    }


    /*
        // BOTTOM-BUTTONS
        document.querySelector('#bottom-buttons').addEventListener('click', (e) => {
            // clear storage? (temp dev func)
            if (e.target.id == 'clearStorage') {
                //clear LS
                localStorage.clear();
                // update noteList
                loadFromLS();
                //display msg below
                displayMsg('Storage cleared!');
            }
        });
    
    */


    /// AUTO-SAVE
    (enableAutoSave = () => {
        // on editor-changes
        app.quill.on('text-change', autoSave);

        // on title-changes
        document.querySelector('#title-input').addEventListener('change', (e) => {
            // update untitled-status
            untitled();

            // autosave (if on in settings)
            autoSave();
        });
    })();




    /// SEARCH NOTES
    document.querySelector('#search-input').addEventListener('keyup', searchNotes);

}// applyEars
