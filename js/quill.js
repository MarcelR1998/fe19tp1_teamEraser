/*
 * Quill editor
 *************/

var toolbarOptions = [
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
    [{
        'direction': 'rtl'
    }], // text direction

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

    ['clean'] // remove formatting button
];


//Init editor
var Delta = Quill.import('delta');
var quill = new Quill('#editor', {
    modules: {
        toolbar: toolbarOptions
    },
    theme: 'snow'

});

// Clear editor
const clearNote = () => {
    quill.deleteText(0, 999);
}

