/*
* INTERACTION
****************/

// Display user msg
const displayMsg = (msg, selector = '#editorMsg') => {
    document.querySelector(selector).innerHTML = msg;
}

// BOTTOM BUTTONS
let saveNoteBtn = document.getElementById('save-note');
let deleteNotebtn = document.getElementById('delete-note');
let clearNoteBtn = document.getElementById('clear-text');

saveNoteBtn.addEventListener("click", saveNote);
deleteNotebtn.addEventListener("click", deleteNote);
clearNoteBtn.addEventListener("click", clearNote);



// NAVBAR
// Get requested content
const subnavContent = (title) => {
    /*
    * SETUP
    ********/

    // set subnav title
    document.querySelector('#side-subnav .body .title').innerHTML = title;

    // set active filter
    const activeFilter = title.toLowerCase();

    /*
    * FUNCS 
    **********/

    // available sort-functions
    const sortFuncs = {
        byUpdated: (a, b) => a.updated > b.updated ? -1 : 1,
        byUpdatedAsc: (a, b) => a.updated < b.updated ? -1 : 1,
        byCreated: (a, b) => a.id > b.id ? -1 : 1,
        byCreatedAsc: (a, b) => a.id < b.id ? -1 : 1
    }

    // sort notes by updated last
    const applySort = (notes = noteList, sortFunc = 'byUpdated') => notes.sort(sortFuncs[sortFunc]);

    // available filters
    const filterFuncs = {
        search: (note) => false, // edit search-filter
        all: (note) => true,
        favorites: (note) => note.favorite,
        created: (a, b) => a.lastUpdated > b.lastUpdated ? -1 : 1
    }

    // apply filter
    const applyFilter = (notes, filterBy = () => true) => notes.filter(filterBy);

    // get printable timestamps (created, updated)
    const dateStamps = (note) => {
        let updateTime = new Date(note.updated);
        let createTime = new Date(note.id);

        return {
            updatedDate: updateTime.toLocaleDateString(),
            updatedTime: updateTime.toLocaleTimeString().slice(0, 5),
            createdDate: createTime.toLocaleDateString(),
            createdTime: createTime.toLocaleTimeString().slice(0, 5)
        };
    }

    // available html-templates
    templates = {
        default: (note) =>
            `<li class="item note" data-note-id="${note.id}" data-created="" data-lastUpdated="">
                <h4 class="itemTitle">${note.title}</h4>
                <div class="itemContent">${note.text}</div>
                <div class="meta">
                    <p class="lastUpdated">updated <span>${dateStamps(note).updatedDate} ${dateStamps(note).updatedTime}</span></p>
                    <p class="created">created <span>${dateStamps(note).createdDate} ${dateStamps(note).createdTime}</span></p>
                </div>
            </li>`
    }

    // apply template
    const applyTemplate = (notes, template = 'default') => notes.map(note => templates[template](note));

    // print notes to DOM
    const printList = (content = '', parentSelector = '#side-subnav .body .content') => {
        // var ska content printas
        const parentElem = document.querySelector(parentSelector);

        // om content inte är str, joina till str
        content = typeof content !== 'string' ? content.join('') : content;

        // print
        parentElem.innerHTML =
            `<ul class="noteList">
                ${content}
            </ul>`;
    }

    // apply listener to load note
    const applyListener = (selector = 'ul.noteList li', trigger = 'click') => {
        // vad ska lyssna?
        const targets = document.querySelectorAll(selector);
        // placera öron
        targets.forEach((target, nth) => {
            targets[nth].addEventListener(trigger, (e) => {
                loadNote(e.target.closest('li.item.note').dataset.noteId);
            })
        })
    }


    /*
    * ACTION
    **********/

    // print sorted notes with applied template and filter
    printList(applyTemplate(
        applyFilter(
            applySort(noteList), filterFuncs[activeFilter]
        )));

    // be ready to load specific note in editor
    applyListener('ul.noteList li', 'click');
} // subnavContent()

// Display subnav
const openSubnav = (name) => {
    subnavContent(name);
    //
    const subnav = document.querySelector("#side-subnav");
    if (subnav.dataset.open === 'false') {
        subnav.style.width = "250px";
        subnav.dataset.open = true;
    }
}

// Hide subnav
const closeSubnav = () => {
    const subnav = document.querySelector("#side-subnav");
    if (subnav.dataset.open === 'true') {
        subnav.style.width = "0";
        subnav.dataset.open = false;
    }
}

/*
// Display Subnav (For when user clicks outside icon, but still on button)
const openSubnav2 = (e) => {
    subnavContent(e.target.dataset.title);
    //
    const subnav = document.querySelector("#side-subnav");
    if (subnav.dataset.open === 'false') {
        subnav.style.width = "250px";
        subnav.dataset.open = true;
    }

}
*/


