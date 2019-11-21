/*
* INTERACTION
*************'''''*/

// Display user msg
const displayMsg = (msg, selector = '#editorMsg') => {
    document.querySelector(selector).innerHTML = msg;
}

// NAVBAR
// Get wanted content
const subnavContent = (title) => {
    // set subnav title
    document.querySelector('#side-subnav .body .title').innerHTML = title;

    const allNotes = () => {

        // get stored notes and print list
        // let notes = getStored('myNotes') || [];



        // sort notes by updated last
        //notes.sort((a, b) => a.lastUpdated > b.lastUpdated ? -1 : 1);

        // put formated notes in arr
        let htmlArr = [];

        for (let x = 0; x < noteList.length; x++) {
            let updateTime = new Date(noteList[x].updated);
            let createTime = new Date(noteList[x].id);
            let updateDateString = updateTime.toLocaleDateString();
            let createDateString = createTime.toLocaleDateString();
            let updateTimeString = updateTime.toLocaleTimeString().slice(0, 5);
            let createTimeString = createTime.toLocaleTimeString().slice(0, 5);
            let content =
                `<li class="item note" data-note-id="${noteList[x].id}" data-created="" data-lastUpdated="">
                <h4 class="itemTitle">${noteList[x].title}</h4>
                <div class="itemContent">${noteList[x].text}</div>
                <div class="meta">
                    <p class="lastUpdated">updated <span>${updateDateString} ${updateTimeString}</span></p>
                    <p class="created">created <span>${createDateString} ${createTimeString}</span></p>
                </div>
            </li>`;
            htmlArr.push(content);
        }

        // make html-str
        let htmlStr = '';
        htmlArr.forEach((el, i) => {
            htmlStr += el;
        });
        //console.log(toString(htmlArr));
        //return;

        // print note-list
        document.querySelector('#side-subnav .body .content').innerHTML =
            `<ul class="noteList">
            ${htmlStr}
        </ul>`;


        let itemNote = document.querySelectorAll('ul.noteList li');

        itemNote.forEach(function (element) {
            element.addEventListener("click", function (e) {
                loadNote(element.dataset.noteId)
            })
        });

        /*
        // create excerpt
        const listItems = document.querySelectorAll('.itemContent');
        listItems.forEach(function (content, index) {
            console.log(content.childNodes[3], index);
            let excerpt = content.childNodes[3].innerHTML.textcontent + '...';
            content.childNodes[3].innerHTML = excerpt;
        });
        */
    }

    // return if not on "all notes" /temp***
    if (title === 'all') {
        allNotes()
    } else { // temp*
        document.querySelector('#side-subnav .body .content').innerHTML = '';
        return;
    }

}

// Display subnav
const openSubnav = (e) => {
    subnavContent(e.target.parentElement.dataset.title);
    //
    const subnav = document.querySelector("#side-subnav");
    subnav.style.width = "250px";
    subnav.dataset.open = true;
}

// Display Subnav (For when user clicks outside icon, but still on button)
const openSubnav2 = (e) => {
    subnavContent(e.target.dataset.title);
    //
    const subnav = document.querySelector("#side-subnav");
    subnav.style.width = "250px";
    subnav.dataset.open = true;
}

// Hide subnav
const closeSubnav = () => {
    const subnav = document.querySelector("#side-subnav");
    subnav.style.width = "0";
    subnav.dataset.open = false;
}
