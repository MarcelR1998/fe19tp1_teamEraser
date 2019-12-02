/*
* APP
******/



/// APP
const app = {
    // upcoming editor instance
    quill: null,

    // notes in sync
    noteList: [],

    // id of the note currently in preview/edit
    activeId: false,

    // on win load
    init: () => {
        // init editor api instance
        app.quill = app.quill === null ? initEditor() : app.quill;

        // set listeners for autosave
        enableAutoSave();

        // sync the global noteList with LS
        loadFromLocalStorage();

        // count user visits (include current)
        updateVisits();

        // show welcome popup (if first visit)
        welcomePopup();
    }
};



/// INIT ON WINDOW LOAD
window.addEventListener("load", app.init);
