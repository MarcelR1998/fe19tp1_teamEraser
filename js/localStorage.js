/*
 * LOCAL STORAGE 
 *****************/


// Save to LS
function saveToLocalStorage() {
    localStorage.setItem("noteList", JSON.stringify(noteList));
    console.log('saved notes to LS');
}

// Load from LS
function loadFromLocalStorage() {
    let noteListString = localStorage.getItem("noteList");
    noteList = JSON.parse(noteListString);

    if (noteList == null) {
        noteList = [];
        console.log('noteList is empty');
    }
    console.log('Notes loaded from LS');
}