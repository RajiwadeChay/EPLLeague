var logOutBtn = document.querySelector(".logout a");
let uEmail = localStorage.getItem('uEmail') ? localStorage.getItem('uEmail') : '';

//for checking user is logged in or not
if (uEmail == '') {
    alert('You need to login first!');
    location.href = "loginpage.html";
}

//logout event listener
logOutBtn.addEventListener("click", Logout);

//function to logout
function Logout() {
    localStorage.removeItem('fName');
    localStorage.removeItem('uEmail');
    localStorage.removeItem('newPswd');
    location.href = "loginpage.html";
}

let html = document.querySelector("html");
let hamburger = document.querySelector(".hamburger");
let hamBar = document.querySelector(".bar");
let nav = document.querySelector("nav");

//eventlistner for hamburger
hamBar.addEventListener("click", openMenu);

//function to open hamburger menu
function openMenu() {
    html.classList.toggle("active-html");
    hamburger.classList.toggle("active-ham");
    nav.classList.toggle("active-nav");
}

//for keeping current nav tab active
let currentPageURL = location.href;
let currentPage = currentPageURL.toString().includes("clublist.html");
let navUl = document.querySelector("nav ul");
const navTabArr = document.querySelectorAll("nav a");

navTabArr.forEach(function (item) {
    let tabHref = item.href.toString().includes("clublist.html");
    if (currentPage == true && tabHref == true) {
        item.classList.add("active-nav-tab");
    } else {
        item.classList.remove("active-nav-tab");
    }
});

//for getiing data from api 
let clublist = document.querySelector(".clubs-list");
let clubsBtn = document.querySelector(".clubs-btn");
let clubsBtnSpan = document.querySelector(".clubs-btn span");
let clubListURL = "https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.clubs.json";
let clubInfoURL = "https://raw.githubusercontent.com/openfootball/football.json/master/2019-20/en.1.json";
var clubData, listCount, clubDataLi, showCount;
let displayInfo = document.querySelector(".display-info");
let clubName = document.querySelector(".club-name");
let infoContainer = document.querySelector(".club-info-container");
let showMore = document.querySelector(".show-more a");

// function to get club list from api defining async function
async function getClubsList(url) {

    // Storing response
    const response = await fetch(url);

    // Storing data in form of JSON
    let data = await response.json();
    //displaying output
    data.clubs.forEach(function (item) {
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.textContent = item.name;
        li.appendChild(a);
        clublist.appendChild(li);
        a.addEventListener("click", selectedClub);
    });
}
// Calling that async function
getClubsList(clubListURL);

// function to get club info from api defining async function
async function getClubInfo(url) {

    // Storing response
    const response = await fetch(url);

    // Storing data in form of JSON
    let data = await response.json();
    showClubInfo(data);
}
// Calling that async function
getClubInfo(clubInfoURL);

//function for showing club info 
function showClubInfo(data) {
    clubData = data;
}

//showing club list onclick of clubs btn
clubsBtn.addEventListener("click", function () {
    clublist.classList.toggle("show-list");
    //for ratating dropdown icon on click
    clubsBtnSpan.classList.toggle("rotate");
});

//Function for selected club 
function selectedClub() {
    let selectedClubName = this;

    infoContainer.classList.add("show");

    clubData.matches.forEach(function (item) {
        if (item.team1 == selectedClubName.textContent || item.team2 == selectedClubName.textContent) {
            clubName.textContent = selectedClubName.textContent;
            let li = document.createElement("li");
            let clubDetails = '<div class="cd-heading"><h4> Round : ' + item.round + '</h4>' +
                '<h4> Date : ' + item.date + '</h4></div>' +
                '<div class = "cd-score"><p>' + item.team1 + '</p>' + '<p>VS</p>' +
                '<p>' + item.team2 + '</p>';
            li.innerHTML = clubDetails;
            displayInfo.appendChild(li);
            clubDataLi = displayInfo.childNodes;
            listCount = displayInfo.childNodes.length;
        }
    });
    showCount = 5;
    showFive(showCount);
}

//function to show five 
function showFive(count) {
    for (let i = 0; i < count; i++) {
        clubDataLi[i].classList.add("show");
        if (i == listCount - 1) {
            showMore.parentElement.classList.add("hide");
        } else {
            showMore.parentElement.classList.remove("hide");
        }
    }
}

//function to show more five
showMore.addEventListener("click", function () {
    showCount += 5;
    showFive(showCount);
});