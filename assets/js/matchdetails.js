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
let currentPage = currentPageURL.toString().includes("matchdetails.html");
let navUl = document.querySelector("nav ul");
const navTabArr = document.querySelectorAll("nav a");

navTabArr.forEach(function (item) {
    let tabHref = item.href.toString().includes("matchdetails.html");
    if (currentPage == true && tabHref == true) {
        item.classList.add("active-nav-tab");
    } else {
        item.classList.remove("active-nav-tab");
    }
});