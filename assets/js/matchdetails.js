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

//for keeping current nav tab active
let currentPageURL = location.href;
let currentPage = currentPageURL.toString().includes("matchdetails.html");
let navUl = document.querySelector("nav ul");
const navTabArr = document.querySelectorAll("nav a");

navTabArr.forEach(function (item) {
    let tabHref = item.href.toString().includes("matchdetails.html");
    if (currentPage == true && tabHref == true) {
        console.log("passed");
        item.classList.add("active-nav-tab");
    } else {
        item.classList.remove("active-nav-tab");
    }
});