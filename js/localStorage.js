/*
 * LOCAL STORAGE 
 *****************/



/// SAVE NOTES TO LS
const saveToLocalStorage = () => {
    localStorage.setItem("noteList", JSON.stringify(app.noteList));
}



/// LOAD NOTES FROM LS
const loadFromLocalStorage = () => {
    let noteListString = localStorage.getItem("noteList");
    app.noteList = JSON.parse(noteListString);

    if (app.noteList == null) {
        app.noteList = [];
    }
}