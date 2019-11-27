/*
 * NOTES
 ***********/


// CLASS

class Note {
    constructor(id, updated, title, text, content, favorite, theme) {
        this.id = Date.now();
        this.updated = Date.now();
        this.title = document.getElementById("title-input").value;
        this.text = quill.getText(0, 30);
        this.content = quill.getContents();
        this.favorite = false;
        this.theme = theme.className;

        // set global var active id to this
        activeId = this.id;
        console.log('active id updated to new note');
    }
}


// NOTE FUNCS

function newNote() {
    console.log("new note");
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

function saveNote() {
    // If id exists in noteList, overwrite orig with updated. 
    let orig = noteList.find(item => item.id === Number(activeId)) || false;

    if (orig) {
        console.log('Updating existing note...');
        let i = noteList.indexOf(orig);
        noteList[i].content = quill.getContents();
        noteList[i].text = quill.getText(0, 30);
        noteList[i].title = document.getElementById("title-input").value;
        noteList[i].updated = Date.now();
        noteList[i].theme = theme.className;
    } else {
        // Otherwhise, add updated as new.
        console.log('Saving new note...');
        let newNote = new Note(
            Date.now(),
            Date.now(),
            document.getElementById("title-input").value,
            quill.getText(0, 30),
            quill.getContents(),
            false,
            theme.className
        );

        //activeId = newNote.id;

        noteList.push(newNote);
    }
    saveToLocalStorage();

}

function deleteNote() {
    console.log('deleting note...')
    // jämför note.id med id:n i noteList
    // vid match, ta bort noteList[x] ur noteList
    if (activeId) {
        noteList.forEach(function (item, i) {
            if (Number(activeId) === item.id) {
                noteList.splice(i, 1);
            }
        });
    }
    newNote();
    console.log('Note deleted');
    // spara
    saveToLocalStorage();
}



function loadNote(id) {
    noteList.forEach(element => {
        if (element.id === Number(id)) {
            console.log('loaded note: ' + element.title + " " + id);
            quill.setContents(element.content);
            document.getElementById("title-input").value = element.title;
            activeId = id;
            editor.className = element.theme;
        }
    });
}

function clearNote() {
    quill.deleteText(0, 999);
}

function updateFavStatus(noteId) {
    // find note to mark/unmark
    let note = noteList.find(note => note.id === Number(noteId)) || false;

    // if not found, abort
    if (!note) {
        console.log('Couldn\'t find note to mark as fav');
        return;
    }

    // update favorite-status
    if (!note.favorite) {
        note.favorite = true;
    } else {
        note.favorite = false;
    }

    // save changes to LS
    saveToLocalStorage();

    // re-render the DOM-list
    subnavContent(document.querySelector('#side-subnav .body .title').innerHTML);
    console.log('Note', note.id, 'is now favorite:', note.favorite);
}
