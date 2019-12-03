/*
 * NOTES
 ********/



/// CLASS
class Note {
    constructor(id, updated, title, text, content, favorite, theme) {
        this.id = Date.now();
        this.updated = Date.now();
        this.title = document.querySelector("#title-input").value;
        this.text = app.quill.getText(0, 30);
        this.content = app.quill.getContents();
        this.favorite = false;
        this.theme = theme;

        // set global var active id to this
        app.activeId = this.id;
    }
}


/// NEW NOTE SETUP
const prepForNewNote = () => {
    // kill active note
    app.activeId = false;

    // clear possible editor content
    app.quill.setContents("");

    // clear note title input field
    document.getElementById("title-input").value = "";

    // reset editor theme
    editor.className = "ql-container ql-snow";

    // auto-focus on editor
    document.querySelector('#editor .ql-editor.ql-blank').focus();
}



/// SAVE NOTE
const saveNote = () => {
    // If id exists in noteList, overwrite orig with updated. 
    let orig = app.noteList.find(item => item.id === Number(app.activeId)) || false;

    if (orig) {
        console.log('Updating existing note...');
        let i = app.noteList.indexOf(orig);
        app.noteList[i].content = app.quill.getContents();
        app.noteList[i].text = app.quill.getText(0, 30);
        app.noteList[i].title = document.querySelector("#title-input").value;
        app.noteList[i].updated = Date.now();
        app.noteList[i].theme = theme.className;
    } else {
        // Otherwhise, add updated as new.
        console.log('Saving new note...' + theme.className);
        let newNote = new Note(
            Date.now(),
            Date.now(),
            document.querySelector("#title-input").value,
            app.quill.getText(0, 30),
            app.quill.getContents(),
            false,
            theme.className
        );

        app.noteList.push(newNote);
    }

    // update LS
    saveToLocalStorage();
}



/// DELETE NOTE
const deleteNote = (id) => {
    // assuming parameter's a valid num. But just in case, if not, bail...
    if (!id || id == 'undefined') {
        console.log('Couldn\'t find the note id. Nothing was deleted.');
        return;
    }

    // delete the note, explained from inside and out:
    // 1. find the note to delete
    // 2. get the note's actual index in noteList
    // 3. delete the note by noteList index
    app.noteList.splice(
        app.noteList.indexOf(
            app.noteList.find(note => note.id === id)
        ), 1);


    // update LS
    saveToLocalStorage();

    // re-render the DOM-list
    renderSubnav();

    // if deleted note was active note, clear editor
    if (id === Number(app.activeId)) {
        clearNote();
    }
}



/// LOAD SPECIFIC NOTE IN EDITOR
const loadNote = (id) => {
    // if autosave, pause till note is loaded
    // (prevents it from saving as new at load)
    let pauseAutosave = false;
    if (autosaveStatus()) {
        pauseAutosave = true;
        autoSaveBtn.children[0].innerHTML = 'off';
    }

    // find note to load
    let loadedNote = app.noteList.find(note => note.id === Number(id)) || false;

    if (loadedNote) {
        // update active note
        app.activeId = loadedNote.id;
        // title to title-field
        document.querySelector("#title-input").value = loadedNote.title;
        // content to editor
        app.quill.setContents(loadedNote.content);
        // font to editor
        editor.className = loadedNote.theme;
    }

    // if autosave was paused, turn it back on
    if (pauseAutosave) {
        autoSaveBtn.children[0].innerHTML = 'on';
    }
}



/// TOGGLE FAVORITE
function updateFavStatus(id) {
    // find note to mark/unmark
    let note = app.noteList.find(note => note.id === Number(id)) || false;

    // if not found, bail
    if (!note) {
        return console.log('Couldn\'t find note to mark as fav');
    }

    // toggle fav-status
    if (!note.favorite) {
        note.favorite = true;
    } else {
        note.favorite = false;
    }

    // save changes to LS
    saveToLocalStorage();

    // re-render the DOM-list
    renderSubnav(document.querySelector('#side-subnav .body .title').innerHTML);
}


/*
/// TOGGLE AUTO-SAVE
const toggleAutoSave = () => {
    //let status = document.querySelector('#autoSave').checked;
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
*/


/// GET CURRENT AUTO-SAVE STATUS
const autosaveStatus = () => {
    return JSON.parse(localStorage.getItem('autoSave'));
}

const autosaveToggle = () => {
    //console.log('autosave:', document.querySelector('#autoSave').checked)

    let status = autosaveStatus();

    localStorage.setItem('autoSave', JSON.stringify(!status));
    //document.querySelector('#autoSave').checked = !document.querySelector('#autoSave').checked;
}


/// AUTO-SAVE NOTE
const autoSave = () => {
    // bail if:

    // ...autosave is off
    if (!autosaveStatus()) {
        return;
    }

    // ...new note is empty
    if (!app.activeId && app.quill.getLength() < 2) {
        return;
    }

    // else, save
    saveNote();
}



/// SEARCH NOTES
const searchNotes = () => {
    //renderSubnav('all');
    let searchValue = document.querySelector('#search-input').value;
    console.log('searching for:', searchValue)

    /// FUNCS

    // checks if filter matches any content substr
    const substrMatch = (str, substr) => {
        let match = false;
        if (str.indexOf(substr) > -1) {
            match = true;
        }
        return match;
    }

    // hide or show elem
    const hideOrShow = (elem, selectors, filter, func) => {
        // assume no match
        let show = false;

        // gather content to compare
        let content = [];
        selectors.forEach((item, i) => {
            content.push(elem.querySelector(selectors[i]));
        });

        // if any content matches, make show true for current note
        content.forEach((item, i) => {
            if (func(content[i].innerHTML.toLowerCase(), filter)) {
                show = true;
            }
        });

        // ..and if show is true, display note
        if (show) {
            elem.style.display = '';
        } else {
            elem.style.display = 'none';
        }
    }


    /// ACTION

    // decide visibility for each note based on search input
    let notesInDom = document.querySelectorAll("ul.noteList li.note");

    notesInDom.forEach((item, i) => {
        hideOrShow(
            notesInDom[i], // note-elem in DOM
            ['.itemTitle', '.itemContent'], // elem-children with text to compare
            searchValue.toLowerCase(), // filter
            substrMatch // compare-function
        );
    });

} // searchNotes()