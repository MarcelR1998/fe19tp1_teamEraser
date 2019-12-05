const theme = document.querySelector('#editor');

// toggle darkMode status
const darkModeToggle = () => {
    // toggle status in LS
    localStorage.setItem('darkMode', !getDarkModeStatus());

    // show the right icon
    updatedarkModeStatus();
}


// get darkModeStatus from LS
const getDarkModeStatus = () => {
    let res = JSON.parse(localStorage.getItem('darkMode')) || false;
    return res;
}


// update DOM based on darkMode status in LS
const updatedarkModeStatus = () => {
    let icon = document.querySelector('#darkMode') || false;

    if (getDarkModeStatus()) {
        // css
        document.getElementById("darksheet").href = "css/darktheme.css"
        // logo
        document.querySelector('#quireLogo').setAttribute('src', 'media/logo-darkmode.png');

        // toggle icon
        if (icon) {
            icon.checked = true;
            document.querySelector('#darkMode-container i').className = 'fas fa-sun';
        }
    } else {
        // css
        document.getElementById("darksheet").href = "/";
        // logo
        document.querySelector('#quireLogo').setAttribute('src', 'media/logo.png');

        //icon
        if (icon) {
            icon.checked = false;
            document.querySelector('#darkMode-container i').className = 'fas fa-moon';
        }
    }
}

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("font-change-roboto")) {
        theme.classList.remove("font-courgette");
        theme.classList.remove("font-vollkorn");
        console.log("loaded sans-serif font template");
    }

    if (e.target.classList.contains("font-change-courgette")) {
        theme.classList.remove("font-vollkorn");
        theme.classList.add("font-courgette");
        console.log("loaded quirky font template")
    }

    if (e.target.classList.contains("font-change-vollkorn")) {
        theme.classList.remove("font-courgette");
        theme.classList.add("font-vollkorn");
        console.log("loaded serif font template")
    }
});