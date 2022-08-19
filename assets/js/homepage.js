var logOutBtn = document.querySelector(".logout a");
let uEmail = localStorage.getItem('uEmail') ? localStorage.getItem('uEmail') : '';

const readMoreArr = document.querySelectorAll("a[title='Read More']");


//logout event listener
logOutBtn.addEventListener("click", Logout);

if (uEmail == '') {
  alert('You need to login first!');
  location.href = "loginpage.html";
}
function Logout() {
  localStorage.removeItem('fName');
  localStorage.removeItem('uEmail');
  localStorage.removeItem('newPswd');
  location.href = "loginpage.html";
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


