/*
* USER
********/



/// GET NUMBER OF USER VISITS
const prevVisits = () => {
    return JSON.parse(localStorage.getItem('visitCount'));
}



/// UPDATE NUMBER OF USER VISITS
const updateVisits = () => {
    let updated;

    if (!(prevVisits() > 0)) {
        updated = 1;
    } else {
        updated = prevVisits() + 1;
    }

    localStorage.setItem("visitCount", JSON.stringify(updated));
}



/// DISPLAY WELCOME POPUP
const welcomePopup = () => {
    if (!(prevVisits() > 1)) {
        // display popup
        document.querySelector(".popup").classList.remove("invisible");
        document.querySelector(".blur").classList.remove("invisible");

        // add ears to hide it
        document.querySelector('#closeWelcome').addEventListener("click", function (e) {
            e.target.closest('.popup').classList.add("invisible");
            document.querySelector(".blur").classList.add("invisible");
        });
    }
}



// DISPLAY USER MESSAGE
const displayMsg = (msg, selector = '#editorMsg') => {
    document.querySelector(selector).innerHTML = msg;
}