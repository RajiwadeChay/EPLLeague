var logOutBtn = document.querySelector(".logout a");
var userEmail = localStorage.getItem('currentUserEmail') ? localStorage.getItem('currentUserEmail') : '';

const readMoreArr = document.querySelectorAll("a[title='Read More']");

//for checking user is logged in or not
if (userEmail == '') {
  alert('You need to login first!');
  location.href = "index.html";
}

//logout event listener
logOutBtn.addEventListener("click", Logout);

//function to logout
function Logout() {
  localStorage.removeItem('currentUserEmail');
  localStorage.removeItem('currentUserPswd');
  location.href = "index.html";
}

readMoreArr.forEach(function (item) {
  item.addEventListener("click", function () {
    let parentDiv = item.parentElement.parentElement;
    parentDiv.classList.toggle("expand");
    if (parentDiv.classList.contains("expand")) {
      item.textContent = "Read Less";
    } else {
      item.textContent = "Read More";
    }
  })
});

const sliderList = document.querySelector(".slider-container ul");
const slidesArr = Array.from(sliderList.children);
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const carousel = document.querySelector(".carousel");
const dotArr = Array.from(carousel.children);
let count = 1;

prevBtn.addEventListener("click", minusCount);
nextBtn.addEventListener("click", pluseCount);
dotArr.forEach(openSlide);

//for auto slide
slideShow();
function slideShow() {
  slidesArr.forEach(function (item, idx) {
    item.classList.remove("show");
    item.classList.remove("fade");
    dotArr[idx].classList.remove("active-dot");
  });
  count++;
  if (count > slidesArr.length) { count = 1 }
  slidesArr[count - 1].classList.add("show");
  slidesArr[count - 1].classList.add("fade");
  dotArr[count - 1].classList.add("active-dot");
  setTimeout(slideShow, 3000); // for caaling afetr each 3sec
}

//for manual slide
function manualShow(count) {
  slidesArr.forEach(function (item, idx) {
    item.classList.remove("show");
    item.classList.remove("fade");
    dotArr[idx].classList.remove("active-dot");
  });
  slidesArr[count - 1].classList.add("show");
  slidesArr[count - 1].classList.add("fade");
  dotArr[count - 1].classList.add("active-dot");
}

//on click on prev btn
function minusCount() {
  if (count > 1) {
    count--;
    manualShow(count);
  } else {
    count = slidesArr.length;
    manualShow(count);
  }
}

//on click of next btn
function pluseCount() {
  if (count >= slidesArr.length) {
    count = 1
    manualShow(count);
  } else {
    count++;
    manualShow(count);
  }
}

//on click of carousel dot
function openSlide(item, idx) {
  item.addEventListener("click", viewSlide);
  function viewSlide() {
    count = idx + 1;
    manualShow(count);
  }
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
let currentPage = currentPageURL.toString().includes("homepage.html");
let navUl = document.querySelector("nav ul");
const navTabArr = document.querySelectorAll("nav a");

navTabArr.forEach(function (item) {
  let tabHref = item.href.toString().includes("homepage.html");
  if (currentPage == true && tabHref == true) {
    item.classList.add("active-nav-tab");
  } else {
    item.classList.remove("active-nav-tab");
  }
});