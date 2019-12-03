/*
* INTERACTION
****************/



/// DISPLAY SUBNAV
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



/// HIDE SUBNAV
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

    // abort requested delete
    app.state.deleteRequested = false;
}



/// RENDER SUBNAV CONTENT
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
    const applySort = (items = app.noteList, type = 'updated') => items.sort(sortBy[type]);


    // available filters
    const filterTypes = {
        all: (item) => true,
        favorites: (item) => item.favorite
    }

    // apply filter
    const applyFilter = (items, type = () => true) => items.filter(type);


    // get printable timestamps (created, updated)
    const dateStamps = (item) => {
        let updateTime = new Date(item.updated);
        let createTime = new Date(item.id);

        return {
            updatedDate: updateTime.toLocaleDateString(),
            updatedTime: updateTime.toLocaleTimeString().slice(0, 5),
            createdDate: createTime.toLocaleDateString(),
            createdTime: createTime.toLocaleTimeString().slice(0, 5)
        };
    }

    // choose favStar-icon based on the note's favStatus
    const favIconClass = (item) => {
        return item.favorite ? 'fas' : 'far';
    }

    // available html-templates
    templates = {
        note: (note) =>
            `<li class="item note" data-note-id="${note.id}" data-created="" data-lastUpdated="">
                <h4 class="itemTitle">${note.title}</h4>
                <div class="itemContent">${note.text}</div>
                <div class="meta">
                    <p class="lastUpdated">updated <span>${dateStamps(note).updatedDate} ${dateStamps(note).updatedTime}</span></p>
                    <p class="created">created <span>${dateStamps(note).createdDate} ${dateStamps(note).createdTime}</span></p>
                    <button class = "favoriteNote ${favIconClass(note)} fa-star"></button>
                    <button class = "deleteNote far fa-trash-alt"></button> 
                </div>
            </li>`,
        settings: (item) =>
            `<li class="item setting">
                <div id="${item.id}" class="${item.classes}">
                    <p class="name">${item.name}</p>
                    <label class="switch settingsToggle">
                        <input type="checkbox"/>
                        <span class="slider round"></span>     
                    </label>
                </div>
            <li>`
    }

    // apply template
    const applyTemplate = (items, template = 'note') => items.map(item => templates[template](item));


    // print notes to DOM
    const print = (content = '', listClass = 'subnavList', parentSelector = '#side-subnav .body .content') => {
        // var ska content printas
        const parentElem = document.querySelector(parentSelector);

        // om content inte är str, joina till str
        content = typeof content !== 'string' ? content.join('') : content;

        // print
        parentElem.innerHTML =
            `<ul class="${listClass}">
                ${content}
            </ul>`;

    }

    // Apply listener to load note on click
    const applyListener = (selector = 'ul.subnavList li', trigger = 'click') => {
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
    // if settings
    if (activeFilter === 'settings') {
        // hide search input
        document.querySelector('#search-input').classList.add('invisible');

        // print settings template...
        print(
            applyTemplate(app.settingsTab, 'settings'), 
            'subnavList'
        );


        return;
        //document.querySelector('#side-subnav .body .content').innerHTML = settingsContent();
    // if notes
    }else{
        print(
            applyTemplate(
                applyFilter(
                    applySort(app.noteList),
                    filterTypes[activeFilter]
                )
            )
        );

        // be ready to load specific note in editor
        applyListener('ul.noteList li', 'click');
    }
    

    

    // if search-input has value, search
    if (document.querySelector('#search-input').value.length > 0) {
        searchNotes();
    }

} // renderSubnav()