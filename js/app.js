
var noteList = [];

/*
 * Quill editor
 *************/

var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote'],

    [{
        'header': 1
    }, {
        'header': 2
    }], // custom button values
    [{
        'list': 'ordered'
    }, {
        'list': 'bullet'
    }],
    [{
        'script': 'sub'
    }, {
        'script': 'super'
    }], // superscript/subscript
    [{
        'indent': '-1'
    }, {
        'indent': '+1'
    }], // outdent/indent
    [{
        'direction': 'rtl'
    }], // text direction

    , // custom dropdown
    [{
        'header': [1, 2, 3, 4, 5, 6, false]
    }],

    [{
        'color': []
    }, {
        'background': []
    }], // dropdown with defaults from theme,
    [{
        'align': []
    }],

    ['clean'] // remove formatting button
];


//Init editor
var Delta = Quill.import('delta');
var quill = new Quill('#editor', {
    modules: {
        toolbar: toolbarOptions
    },
    theme: 'snow'

});

/*
 * Note list
 ***********/

window.addEventListener("load", function () {
    loadFromLocalStorage();
})

activeId = false;

/* 
 * Buttons
 ***********/
let saveNoteBtn = document.getElementById('save-note');
let deleteNotebtn = document.getElementById('delete-note');
//let loadNotebtn = document.getElementById('load-note');

saveNoteBtn.addEventListener("click", saveNote);
//loadNotebtn.addEventListener("click", renderNote);
deleteNotebtn.addEventListener("click", deleteNote);

/* 
 * Save, load, delete functions
 *******************************/

function saveToLocalStorage() {
    localStorage.setItem("noteList", JSON.stringify(noteList));
    console.log('saved noteist to LS');
}

function loadFromLocalStorage() {
    let noteListString = localStorage.getItem("noteList");
    noteList = JSON.parse(noteListString);

    if (noteList == null) {
        noteList = [];
        console.log('noteList is empty');
    }
    console.log('loaded noteList from LS');
}

/*function renderNote(note) {
    activeId = note.id;
    console.log('Active id set to ' + note.id);
}*/

function saveNote() {
    console.log(theme.className);
    // If id exists in noteList, overwrite orig with updated. 
    let orig = noteList.find(item => item.id == activeId) || false;

    if (orig) {
        let i = noteList.indexOf(orig);
        noteList[i].content = quill.getContents();
        noteList[i].text = quill.getText(0, 30);
        noteList[i].title = document.getElementById("title-input").value;
        noteList[i].updated = Date.now();
        noteList[i].theme = theme.className;
    } else {
        // Otherwhise, add updated as new.
        console.log('Saving new note to noteList');
        let noteObj = {
            favorite: false,
            text: quill.getText(0, 30),
            content: quill.getContents(),
            id: Date.now(),
            title: document.getElementById("title-input").value,
            updated: Date.now(),
            theme: theme.className
        }

        activeId = noteObj.id;

        noteList.push(noteObj);
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

function deleteTextFromDOM() {
    quill.deleteText(0, 999);
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

function newNote() {
    console.log("new note")
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





