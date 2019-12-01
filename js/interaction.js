/*
* INTERACTION
****************/


/// RENDER SUBNAV
// Get requested content 
const renderSubnav = (title = document.querySelector('#side-subnav .body .title').innerHTML) => { // (default title if subnav is already open)

    /* SETUP
    *********/

    // set subnav title
    document.querySelector('#side-subnav .body .title').innerHTML = title;

    // set active filter
    const activeFilter = title.toLowerCase();



    /* FUNCS
    *********/

    // available sort-functions
    const sortBy = {
        updated: (a, b) => a.updated > b.updated ? -1 : 1,
        updatedAsc: (a, b) => a.updated < b.updated ? -1 : 1,
        created: (a, b) => a.id > b.id ? -1 : 1,
        createdAsc: (a, b) => a.id < b.id ? -1 : 1
    }

    // sort notes by last updated
    const applySort = (notes = noteList, type = 'updated') => notes.sort(sortBy[type]);


    // available filters
    const filterTypes = {
        all: (note) => true,
        favorites: (note) => note.favorite
    }

    // apply filter
    const applyFilter = (notes, type = () => true) => notes.filter(type);


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

    // choose favStar-icon based on the note's favStatus
    const starIconClass = (note) => {
        return note.favorite ? 'fas' : 'far';
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
                    <button class = "favoriteNote ${starIconClass(note)} fa-star"></button>
                    <button class = "deleteNote far fa-trash-alt"></button> 
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

    // Apply listener to load note on click
    const applyListener = (selector = 'ul.noteList li', trigger = 'click') => {
        // what shall listen
        const targets = document.querySelectorAll(selector) || false;

        // if targetting fails, bail
        if (!targets) {
            return console.log('Failed to apply listeners to load specific notes...');
        }

        // func to place out ears
        const setEars = (target, nth) => {
            targets[nth].addEventListener(trigger, (e) => {

                // if clicked is an action-btn, chill...
                if (e.target.classList.contains('favoriteNote')
                    || e.target.classList.contains('deleteNote')) {
                    return;

                    // else, load note
                } else {
                    loadNote(e.target.closest('li.item.note').dataset.noteId);
                }
            })
        }

        // place out ears on every target
        targets.forEach(setEars);
    }



    /* ACTION
    **********/

    // print sorted notes with applied template and filter
    printList(
        applyTemplate(
            applyFilter(
                applySort(noteList),
                filterTypes[activeFilter]
            )
        )
    );

    // be ready to load specific note in editor
    applyListener('ul.noteList li', 'click');

    // if search-input has value, search
    if (document.querySelector('#search-input').value.length > 0) {
        searchNotes();
    }

} // renderSubnav()


/// Display subnav
const openSubnav = (subnavTitle) => {
    // add shadow-style on open
    const sidenav = document.querySelector('#side-nav');
    sidenav.style.transitionDuration = '.3s';
    sidenav.classList.add('shadowR');

    // prepare the content
    renderSubnav(subnavTitle);

    // roll in the nav
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

    // hide shadow on close
    const sidenav = document.querySelector('#side-nav');
    sidenav.style.transitionDuration = '1.5s';
    sidenav.classList.remove('shadowR');
}


/// SEARCH NOTES

const searchNotes = () => {
    //renderSubnav('all');
    let searchValue = document.querySelector('#search-input').value;
    console.log('searching for:', searchValue)

    /// FUNCS

    // checks if filter matches any content substr
    const substrMatch = (str, substr) => {
        let match = false;
        if (str.indexOf(substr) > -1) {
            match = true;
        }
        return match;
    }

    // hide or show elem
    const hideOrShow = (elem, selectors, filter, func) => {
        // assume no match
        let show = false;

        // gather content to compare
        let content = [];
        selectors.forEach((item, i) => {
            content.push(elem.querySelector(selectors[i]));
        });

        // if any content matches, make show true for current note
        content.forEach((item, i) => {
            if (func(content[i].innerHTML.toLowerCase(), filter)) {
                show = true;
            }
        });

        // ..and if show is true, display note
        if (show) {
            elem.style.display = '';
        } else {
            elem.style.display = 'none';
        }
    }


    /// ACTION

    // decide visibility for each note based on search input
    let notesInDom = document.querySelectorAll("ul.noteList li.note");

    notesInDom.forEach((item, i) => {
        hideOrShow(
            notesInDom[i], // note-elem in DOM
            ['.itemTitle', '.itemContent'], // elem-children with text to compare
            searchValue.toLowerCase(), // filter
            substrMatch // compare-function
        );
    });

}



// Display user msg (temp)
const displayMsg = (msg, selector = '#editorMsg') => {
    document.querySelector(selector).innerHTML = msg;
}