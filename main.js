var noteList = [];

window.addEventListener("load", function () {
    loadFromLocalStorage();
})

/*
* QUILL EDITOR
*********************/

var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote'],
  
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
  
    ,  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme,
    [{ 'align': [] }],
  
    ['clean']                                         // remove formatting button
  ];
  

//INITIALIZE EDITOR
  var quill = new Quill('#editor', {
    modules: {
      toolbar: toolbarOptions
    },
    theme: 'snow'

  });

/*POPUP*/

let visitIndex;
let mainPage = document.querySelectorAll("#side-nav, #main-content");

if(!localStorage.getItem("visitIndex")){
    document.querySelector("#popup").style.display="block";
    for(let i = 0; i <mainPage.length; i++){
        mainPage[i].style.filter = ("brightness(0.3)");
    }
    localStorage.setItem("visitIndex", "visited");
}
else{
    document.querySelector("#popup").style.display="none";
}

/*SIDE NAV*/

let sideNavIndex = 0;

document.addEventListener ("click", function (e){
    if(e.target.classList.contains("exit")){
        e.target.parentElement.style.display="none";
        for(let i = 0; i <mainPage.length; i++){
            mainPage[i].style.filter = ("brightness(1)");
        }
    }

    //parentElement krävs för att den registrerar annorlunda beroende på om man trycker på resten av knappen eller på själv ikonen

    else if(e.target.classList.contains("button-sidebar")||e.target.parentElement.classList.contains("button-sidebar")){
        if(sideNavIndex === 0){
            document.getElementById("side-sub-nav").style.width = "200px";
            if(e.target.id){
                document.getElementById("side-sub-nav-header").innerHTML = e.target.getAttribute("name");
                subnavContent();
            }
            else if(!e.target.id){
                document.getElementById("side-sub-nav-header").innerHTML = e.target.parentElement.getAttribute("name");
                subnavContent();
            }
            sideNavIndex++;
        }
        else if(sideNavIndex === 1){
            document.getElementById("side-sub-nav").style.width = "0px";
            sideNavIndex--;
        }
    }
})

/*NOTES*/

let saveNoteBtn = document.getElementById('save-note');
let deleteNotebtn = document.getElementById('delete-note');
let loadNotebtn = document.getElementById('load-note');
activeID = false;

saveNoteBtn.addEventListener("click", saveNote);
loadNotebtn.addEventListener("click", renderNote);
deleteNotebtn.addEventListener("click", deleteNote);

function saveToLocalStorage() {
    localStorage.setItem("noteList", JSON.stringify(noteList));
    console.log('saved noteList to LS');
}

function loadFromLocalStorage() {
    let noteListString = localStorage.getItem("noteList");
    noteList = JSON.parse(noteListString);

    if (noteList == null) {
        noteList = [];
        console.log('noteList is empty');
    }
    console.log('loaded noteList from LS');
}

function renderNote(note) {
    activeId = note.id;
    console.log('Active id set to ' + note.id);
}

function loadNote(id) {
    //quill.setContents(notens content, source: String = 'api')
    console.log(id);
    noteList.forEach(element => {
        if (element.id == id) {
            quill.setContents = 'hej';//element.content; //noteList[i].content
        }
    });
}
function saveNote() {
    // If id exists in noteList, overwrite orig with updated. 
    let orig = noteList.find(item => item.id == activeId) || false;

    if (orig) {
        console.log('Updating orig in noteList');
        let i = noteList.indexOf(orig);
        noteList[i].content = quill.getContents();
        noteList[i].text = quill.getText(0, 30);
        noteList[i].title = document.getElementById("title-input").value;
        noteList[i].updated = Date.now();

        //noteList.splice(i, 1, updatedContent);
    } else {
        // Otherwhise, add updated as new.
        console.log('Saving new note to noteList');
        let noteObj = {
            favorite: false,
            text: quill.getText(0, 30),
            content: quill.getContents(),
            id: Date.now(),
            title: document.getElementById("title-input").value,
            updated: Date.now()
        }

        activeId = noteObj.id;

        noteList.push(noteObj);
    }
    saveToLocalStorage();
}

function deleteNote() {
    // jämför note.id med id:n i noteList
    // vid match, ta bort noteList[x] ur noteList
    if (!activeId) {
        return;
    }
    noteList.forEach(function (item, i) {
        if (activeId === item.id) {
            noteList.splice(i, 1)
        }
    });
    console.log('Note deleted');
    // spara
    saveToLocalStorage();
}

function deleteTextFromDOM() {
    quill.deleteText(0, 999);
}

/*SUB NAV CONTENT*/

const subnavContent = (title) => {

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
        document.querySelector('.sub-nav-body').innerHTML =
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
    if (document.getElementById("side-sub-nav-header").innerHTML === 'All notes') {
        allNotes()
    } else { // temp*
        document.querySelector('#side-sub-nav-header').innerHTML = '';
        return;
    }

}