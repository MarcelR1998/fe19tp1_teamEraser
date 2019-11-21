// DOCUMENT CLICK-LISTENER
document.addEventListener("click", function (e) {
    // close welcome popup?
    if (e.target.id === 'closeWelcome') {
        e.target.parentElement.classList.add("invisible");
    }

    // nav?
    const subnav = document.querySelector('#side-subnav');
    if (e.target.parentElement.classList.contains('button-sidebar')) {
        openSubnav(e);
    }

    // checks for if user clicked outside of icon, but still within button. Has related function in interaction.js.
    else if (e.target.classList.contains('button-sidebar')) {
        openSubnav2(e);

        // if not nav/subnav, but subnav is open, close subnav
    } else if (e.target !== subnav && !subnav.contains(e.target)) {
        if (this.querySelector('#side-subnav').dataset.open) {
            closeSubnav();
        }
    }
    // subnav closebtn?
    if (e.target.classList.contains('closebtn') && e.target.parentElement.id == 'side-subnav') {
        closeSubnav();
    }


    // load note? (make this smarter?)
    if (e.target.classList.contains('note') && e.target.dataset.id) {
        loadNote(e.target.dataset.id);
    } else if (e.target.parentElement.classList.contains('note') && e.target.parentElement.dataset.id) {
        loadNote(e.target.parentElement.dataset.id);
    } else if (e.target.parentElement.parentElement.classList.contains('note') && e.target.parentElement.parentElement.dataset.id) {
        loadNote(e.target.parentElement.parentElement.dataset.id);
    }

    // clear storage? (dev func)
    if (e.target.id == 'clearStorage') {
        //tinymce.activeEditor.setContent(clearStorage());
        localStorage.clear();
        loadFromLocalStorage();
        displayMsg('Storage cleared!');
    }
});

// Skapa ny note??
document.querySelector('#new_note').addEventListener('click', function () { newNote(); });

