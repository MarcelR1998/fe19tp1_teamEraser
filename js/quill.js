/*
 * QUILL EDITOR
 ***************/



/// API
Quill.import('delta');



/// TOOLBAR PRESET
const toolbarOptions = () => [
    ['bold'], ['italic'], ['underline'], ['strike'], // toggled buttons
    ['blockquote'],

    , // custom button values
    [{
        'list': 'ordered'
    }], [{
        'list': 'bullet'
    }],
    ,
    [{
        'indent': '-1'
    }], [{
        'indent': '+1'
    }], // outdent/indent
    // [{
    //     'direction': 'rtl'
    // }], // text direction


    , // custom dropdown
    [{
        'header': [1, 2, 3, 4, 5, 6, false]
    }],

    [{
        'color': []
    }], [
        {
            'background': []
        }], // dropdown with defaults from theme,
    [{
        'align': []
    }],

    // ['clean'] // remove formatting button
];



/// INIT EDITOR
const initQuill = (instanceOf = app, id = '#editor', toolPreset = toolbarOptions(), theme = 'snow') => {
    instanceOf.quill = new Quill(id,
        {
            modules: { toolbar: toolPreset },
            theme: theme
        }
    );
}


/// CLEAR EDITOR
const clearNote = () => {
    app.quill.deleteText(0, 999);
    document.querySelector("#title-input").value = ""; 
}

