/*
 * NOTES
 ********/


// CLASS

class Note {
    constructor(id, updated, title, text, content, favorite, theme) {
        this.id = Date.now();
        this.updated = Date.now();
        this.title = document.querySelector("#title-input").value;
        this.text = quill.getText(0, 30);
        this.content = quill.getContents();
        this.favorite = false;
        this.theme = theme;

        // set global var active id to this
        activeId = this.id;
    }
}


// NOTE FUNCS

const prepForNewNote = () => {
    //nollställ aktiv note
    activeId = false;
    //rensa eventuell editor-txt
    quill.setContents("");
    //rensa rubrik-fält
    document.getElementById("title-input").value = "";
    //nollställ editor-tema
    editor.className = "ql-container ql-snow";
    //autofokusera editor
    const editorField = document.querySelector('#editor .ql-editor.ql-blank');
    editorField.focus();
}


const saveNote = () => {
    // If id exists in noteList, overwrite orig with updated. 
    let orig = noteList.find(item => item.id === Number(activeId)) || false;

    if (orig) {
        console.log('Updating existing note...');
        let i = noteList.indexOf(orig);
        noteList[i].content = quill.getContents();
        noteList[i].text = quill.getText(0, 30);
        noteList[i].title = document.querySelector("#title-input").value;
        noteList[i].updated = Date.now();
        noteList[i].theme = theme.className;
    } else {
        // Otherwhise, add updated as new.
        console.log('Saving new note...' + theme.className);
        let newNote = new Note(
            Date.now(),
            Date.now(),
            document.querySelector("#title-input").value,
            quill.getText(0, 30),
            quill.getContents(),
            false,
            theme.className
        );

        noteList.push(newNote);
    }
    saveToLocalStorage();

}


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
    noteList.splice(
        noteList.indexOf(
            noteList.find(note => note.id === id)
        ), 1);


    // update LS
    saveToLocalStorage();

    // re-render the DOM-list
    renderSubnav();

    // if deleted note was active note, clear editor
    if (idToDelete === Number(activeId)) {
        clearNote();
    }
}


const loadNote = (id) => {
    // if autosave, pause till note is loaded
    // (prevents it from saving as new at load)
    let pauseAutosave = false;
    if (autosaveStatus()) {
        pauseAutosave = true;
        autoSaveBtn.children[0].innerHTML = 'off';
    }

    // find note to load
    let loadedNote = noteList.find(note => note.id === Number(id)) || false;

    if (loadedNote) {
        // update active note
        activeId = loadedNote.id;
        // title to title-field
        document.querySelector("#title-input").value = loadedNote.title;
        // content to editor
        quill.setContents(loadedNote.content);
        // font to editor
        editor.className = loadedNote.theme;
    }

    // if autosave was paused, turn it back on
    if (pauseAutosave) {
        autoSaveBtn.children[0].innerHTML = 'on';
    }
}


function updateFavStatus(id) {
    // find note to mark/unmark
    let note = noteList.find(note => note.id === Number(id)) || false;

    // if not found, abort
    if (!note) {
        console.log('Couldn\'t find note to mark as fav');
        return;
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
