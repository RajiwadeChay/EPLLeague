var logOutBtn = document.querySelector(".logout a");
var userEmail = localStorage.getItem('currentUserEmail') ? localStorage.getItem('currentUserEmail') : '';

//for checking user is logged in or not
if (userEmail == '') {
  alert('You need to login first!');
  location.href = "loginpage.html";
}

//logout event listener
logOutBtn.addEventListener("click", Logout);

//function to logout
function Logout() {
  localStorage.removeItem('currentUserEmail');
  localStorage.removeItem('currentUserPswd');
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