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

    // settings 
    settings: {
        tabContent: [
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
        icon: {
            true: '<i class="fas fa-sun"></i>',
            false: '<i class="fas fa-moon"></i>',
            update: (status) => {
                if (!status) {
                    document.querySelector('#autoSave-container i').classList.remove('fa-moon');
                    document.querySelector('#autoSave-container i').classList.add('fa-sun');
                } else {
                    document.querySelector('#autoSave-container i').classList.remove('fa-sun');
                    document.querySelector('#autoSave-container i').classList.add('fa-moon');
                }
            }
        }
    },

    state: {
        autoSave: true,
        deleteRequested: false
    },

    // on win load
    init: () => {
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
