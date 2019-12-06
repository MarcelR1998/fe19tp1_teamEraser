/*
 * LOCAL STORAGE 
 *****************/


/// SAVE NOTES TO LS
const saveToLS = (key = 'noteList', val = app.noteList) => {
    localStorage.setItem("noteList", JSON.stringify(val));
}


/// LOAD NOTES FROM LS
const loadFromLS = (key = 'noteList', type = 'note') => {
    let res = JSON.parse(localStorage.getItem(key));

    // notes
    if (type === 'note') {
        app.noteList = res;

        if (app.noteList == null) {
            app.noteList = [];
        }
        // autosave status
    } else if (type === 'autosave') {
        app.state.autoSave = res;
    }
}