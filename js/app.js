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

    // settings tab content
    settingsTab: [
        {
            id: 'autoSave',
            classes: '',
            name: 'Autosave'
        },
        {
            id: 'darkMode',
            classes: '',
            name: 'Darkmode'
        }
    ],

    state: {
        autoSave: true,
        deleteRequested: false
    },

    // on win load
    init: () => {
        if (app.state.autoSave) {
            localStorage.setItem('autoSave', JSON.stringify(true));
        }

        // init editor api instance
        app.quill = app.quill === null ? initEditor() : app.quill;

        // set listeners for autosave
        applyEars();

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
