

let theme = document.querySelector("#editor");
let lightmode = document.getElementById("lightmode");
let darkmode = document.getElementById("darkmode");
let nightmode = document.getElementById("nightmode");

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("lightmode")) {
        theme.classList.remove("darkModeTheme");
        theme.classList.remove("nightModeTheme");
        console.log("loaded sans-serif font template");
    }

    if (e.target.classList.contains("darkmode")) {
        theme.classList.remove("nightModeTheme");
        theme.classList.add("darkModeTheme");
        console.log("loaded quirky font template")
    }

    if (e.target.classList.contains("nattläge")) {
        theme.classList.remove("darkModeTheme");
        theme.classList.add("nightModeTheme");
        console.log("loaded serif font template")
    }
});

/*
const darkModeToggle = (clickedElem) => {
    let status = clickedElem.checked;
    console.log('darkmode:', clickedElem.checked);
}*/

const darkModeToggle = (clickedElem) => {
    let status = clickedElem.checked;
    console.log('darkmode is now: ', clickedElem.checked);
    if (status === true) {

        document.getElementById("darksheet").href = "css/darktheme.css"
    }
    else {

        document.getElementById("darksheet").href = "/";
    }
}
