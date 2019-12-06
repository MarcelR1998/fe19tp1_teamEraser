/*
* APP
******/



/// APP
const app = {
    // editor instance (fill on init)
    quill: null,

    // notes in sync (fill on init)
    noteList: [],

    // id of the note currently in preview/edit
    activeId: false,

    // settings (fill on init)
    settings: {
        tabContent: [],
        toggleIcons: {}
    },

    state: {
        autoSave: true,
        activeSubnav: false,
        deleteRequested: false
    },

    // on win load
    init: () => {
        // init editor api instance
        initQuill();

        // run preset for app settings
        initSettings();

        // darkMode?
        updatedarkModeStatus();

        // set listeners for autosave
        applyEars();

        // sync the global noteList with LS
        loadFromLS();

        // count user visits (include current)
        updateVisits();

        // show welcome popup (if first visit)
        welcomePopup();
    }
};



/// INIT ON WINDOW LOAD
window.addEventListener("load", app.init);
