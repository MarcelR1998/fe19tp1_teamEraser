/*
 * Quill editor
 *************/

var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote'],

<<<<<<< HEAD
    , // custom button values
=======
    [{
        'header': 1
    }, {
        'header': 2
    }], // custom button values
>>>>>>> 5e3bcb4553dc7d50e5d4fd7a3c5a99228f98df9a
    [{
        'list': 'ordered'
    }, {
        'list': 'bullet'
    }],
<<<<<<< HEAD
    ,
=======
    [{
        'script': 'sub'
    }, {
        'script': 'super'
    }], // superscript/subscript
>>>>>>> 5e3bcb4553dc7d50e5d4fd7a3c5a99228f98df9a
    [{
        'indent': '-1'
    }, {
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
<<<<<<< HEAD
    }, 
    {
=======
    }, {
>>>>>>> 5e3bcb4553dc7d50e5d4fd7a3c5a99228f98df9a
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