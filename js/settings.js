/*
* SETTINGS
************/

/// INIT APP SETTINGS
const initSettings = (program = app) => {
    // fill settings content
    program.settings.tabContent = [
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
    ];

    // set settings toggleBtns
    program.settings.toggleIcons = {
        true: 'fas fa-sun',
        false: 'fas fa-moon',
        update: (status) => {
            console.log('updating toggleicon based on', status)
            if (!status) {
                document.querySelector('#autoSave-container i').className = program.settings.toggleIcons.false;
            } else {
                document.querySelector('#autoSave-container i').className = program.settings.toggleIcons.true;
            }
        }
    }

    // set autosave-status
    setAutosave(program.state.autoSave);


    // set editor height (when toolbar at bottom)
    updateEditorHeight();
}