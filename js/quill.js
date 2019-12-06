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
    app.quill.deleteText(0, document.querySelectorAll(".ql-editor")[0].firstChild.innerHTML.length);
    document.querySelector("#title-input").value = "";
    document.querySelector("#title-input").focus();
}



/// DYNAMIC EDITOR HEIGHT
const updateEditorHeight = () => {
    // current dimensions
    let bodyH = document.body.clientHeight,
        bodyW = document.body.clientWidth;

    // if toolbar is at top (wide screens), bail...
    if (bodyW > 732) { return; }

    // set bottom position (based on toolbar rows)
    let bottomSpace = 180;
    //
    if (bodyW <= 261) {
        bottomSpace = 290;
    } else if (bodyW <= 347) {
        bottomSpace = 255;
    } else if (bodyW <= 648) {
        bottomSpace = 215;
    }

    // new height
    let res = (bodyH - bottomSpace) + 'px';

    // set it
    let editor = document.querySelector('#editor .ql-editor').style.height = res;
}