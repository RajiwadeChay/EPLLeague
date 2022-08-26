var body = document.querySelector("body");

//Preventing site from going back to login page
function preventBack() {
  window.history.forward();
}
setTimeout(preventBack(), 0);
window.onunload = function () { null };

//condition for selecting which page js should work
if (body.classList.contains("index-page")) {
  loginPageJS();
} else if (body.classList.contains("home-page")) {
  homePageJS();
} else if (body.classList.contains("club-list-page")) {
  clubListPageJS();
} else if (body.classList.contains("match-details-page")) {
  matchDetailsPageJS();
}

//function for login page js
function loginPageJS() {
  //for sign in form validation
  var signInForm = document.querySelector(".sign-in-form");
  var email = document.getElementById("email");
  var pswd = document.getElementById("pswd");

  //Saving default user details
  var userEmail = "user1@gmail.com";
  var userPswd = "User0001";

  //for keeping banner image of full height
  var html = document.querySelector("html");
  var body = document.querySelector("body");
  var container = document.querySelector(".container");
  var main = document.querySelector("main");
  var loginContent = document.querySelector(".login-content");

  html.classList.add("full-height");
  body.classList.add("full-height");
  container.classList.add("full-height");
  main.classList.add("full-height");
  loginContent.classList.add("full-height");

  //For alert messages
  var close = document.querySelector(".closebtn");
  var alertBox = document.querySelector(".alert");
  var alertMsg = document.querySelector(".alert h3");

  close.addEventListener('click', function () {
    var parentAlert = close.parentElement;
    parentAlert.classList.remove("show");
  });

  pswd.maxLength = 8;

  //function to save data in local storage 
  function saveData() {
    //creating new array for user record
    var userRecords = new Array();
    userRecords = JSON.parse(localStorage.getItem("users")) ? JSON.parse(localStorage.getItem("users")) : [];

    //checking for duplicate data
    if (userRecords.some(function (v) { return v.userEmail == userEmail && v.userPswd == userPswd })) {
      // alert("Duplicate data! please enter another details");
    }
    else {
      userRecords.push({
        "userEmail": userEmail,
        "userPswd": userPswd,
      })
      localStorage.setItem("users", JSON.stringify(userRecords));
      location.href = "EPLLeague/../index.html";
    }

  }

  //saving user data
  saveData();

  //for keeping user log in if he alerady logged in
  var checkUserEmail = localStorage.getItem('userEmail') ? localStorage.getItem('userEmail') : '';
  if (checkUserEmail != '') {
    location.href = "EPLLeague/../homepage.html";
  }

  //function for checking input
  function checkInput(input, regEx, emptyErr, validErr) {
    var value = input.value.trim();
    var errSpan = input.nextElementSibling;
    errSpan.classList.add("visible");
    if (value == null || value == "") {
      errSpan.textContent = emptyErr;
    } else if (!regEx.test(input.value)) {
      errSpan.textContent = validErr;
    } else {
      errSpan.textContent = "error";
      errSpan.classList.remove("visible");
      return valid = true;
    }
    return valid = false;
  }

  //function to validate sign in
  function validateSignIn() {
    var valid;
    valid = checkInput(email, /^([_\-\.0-9a-zA-Z]+)@([_\-\.a-zA-Z]+)\.([a-zA-Z]){2,7}$/, "Please enter your email id", "Please enter valid email id");

    valid = checkInput(pswd, /^(?=.{8,8}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/, "Please enter your password", "Please enter valid password");
    return valid;
  }

  //function for checking user details
  function checkUserDetails() {
    email = email.value;
    pswd = pswd.value;

    var currentRecords = new Array();
    currentRecords = JSON.parse(localStorage.getItem("users")) ? JSON.parse(localStorage.getItem("users")) : [];
    if (currentRecords.some(function (v) { return v.userEmail == email && v.userPswd == pswd })) {
      var currentUser = currentRecords.filter(function (v) { return v.userEmail == email && v.userPswd == pswd })[0];
      localStorage.setItem('currentUserEmail', currentUser.userEmail);
      localStorage.setItem('currentUserPswd', currentUser.userPswd);
      location.href = "EPLLeague/../homepage.html";
    }
    else {
      alertMsg.textContent = "Sign in Failed! Please check details and try again";
      alertBox.classList.add("show");
    }
  }

  //function to sign in
  function signIn(e) {
    //preventing from load
    e.preventDefault();

    if (validateSignIn()) {
      checkUserDetails();
      signInForm.reset();
    }
  }

  //eventlistener when click on submit button
  signInForm.addEventListener("submit", signIn);

  //eventlistners to check validation runtime
  email.addEventListener("blur", function () {
    checkInput(email, /^([_\-\.0-9a-zA-Z]+)@([_\-\.a-zA-Z]+)\.([a-zA-Z]){2,7}$/, "Please enter your email id", "Please enter valid email id");
  });

  pswd.addEventListener("blur", function () {
    checkInput(pswd, /^(?=.{8,8}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/, "Please enter your password", "Please enter valid password");
  });
}

//function for home page js
function homePageJS() {
  var logOutBtn = document.querySelector(".logout a");
  var userEmail = localStorage.getItem('currentUserEmail') ? localStorage.getItem('currentUserEmail') : '';

  var readMoreArr = document.querySelectorAll("a[title='Read More']");

  //for checking user is logged in or not
  if (userEmail == '') {
    alert('You need to login first!');
    location.href = "EPLLeague/../index.html";
  }

  //logout event listener
  logOutBtn.addEventListener("click", Logout);

  //function to logout
  function Logout() {
    localStorage.removeItem('currentUserEmail');
    localStorage.removeItem('currentUserPswd');
    location.href = "EPLLeague/../index.html";
  }

  readMoreArr.forEach(function (item) {
    item.addEventListener("click", function () {
      var parentDiv = item.parentElement.parentElement;
      parentDiv.classList.toggle("expand");
      if (parentDiv.classList.contains("expand")) {
        item.textContent = "Read Less";
      } else {
        item.textContent = "Read More";
      }
    })
  });

  var sliderList = document.querySelector(".slider-container ul");
  var slidesArr = Array.from(sliderList.children);
  var prevBtn = document.querySelector(".prev-btn");
  var nextBtn = document.querySelector(".next-btn");
  var carousel = document.querySelector(".carousel");
  var dotArr = Array.from(carousel.children);
  var count = 1;

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

  var html = document.querySelector("html");
  var hamburger = document.querySelector(".hamburger");
  var hamBar = document.querySelector(".bar");
  var nav = document.querySelector("nav");

  //eventlistner for hamburger
  hamBar.addEventListener("click", openMenu);

  //function to open hamburger menu
  function openMenu() {
    html.classList.toggle("active-html");
    hamburger.classList.toggle("active-ham");
    nav.classList.toggle("active-nav");
  }

  //for keeping current nav tab active
  var currentPageURL = location.href;
  var currentPage = currentPageURL.toString().includes("homepage.html");
  var navUl = document.querySelector("nav ul");
  var navTabArr = document.querySelectorAll("nav a");

  navTabArr.forEach(function (item) {
    var tabHref = item.href.toString().includes("homepage.html");
    if (currentPage == true && tabHref == true) {
      item.classList.add("active-nav-tab");
    } else {
      item.classList.remove("active-nav-tab");
    }
  });
}

//function for login page js
function clubListPageJS() {
  var logOutBtn = document.querySelector(".logout a");
  var userEmail = localStorage.getItem('currentUserEmail') ? localStorage.getItem('currentUserEmail') : '';

  //for checking user is logged in or not
  if (userEmail == '') {
    alert('You need to login first!');
    location.href = "EPLLeague/../index.html";
  }

  //logout event listener
  logOutBtn.addEventListener("click", Logout);

  //function to logout
  function Logout() {
    localStorage.removeItem('currentUserEmail');
    localStorage.removeItem('currentUserPswd');
    location.href = "EPLLeague/../index.html";
  }

  var html = document.querySelector("html");
  var hamburger = document.querySelector(".hamburger");
  var hamBar = document.querySelector(".bar");
  var nav = document.querySelector("nav");

  //eventlistner for hamburger
  hamBar.addEventListener("click", openMenu);

  //function to open hamburger menu
  function openMenu() {
    html.classList.toggle("active-html");
    hamburger.classList.toggle("active-ham");
    nav.classList.toggle("active-nav");
  }

  //for keeping current nav tab active
  var currentPageURL = location.href;
  var currentPage = currentPageURL.toString().includes("clublist.html");
  var navUl = document.querySelector("nav ul");
  var navTabArr = document.querySelectorAll("nav a");

  navTabArr.forEach(function (item) {
    var tabHref = item.href.toString().includes("clublist.html");
    if (currentPage == true && tabHref == true) {
      item.classList.add("active-nav-tab");
    } else {
      item.classList.remove("active-nav-tab");
    }
  });

  //for getiing data from api 
  var clublist = document.querySelector(".clubs-list");
  var clubsBtn = document.querySelector(".clubs-btn button");
  var clubsBtnSpan = document.querySelector(".clubs-btn span");
  var clubListURL = "https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.clubs.json";
  var clubInfoURL = "https://raw.githubusercontent.com/openfootball/football.json/master/2019-20/en.1.json";
  var clubData, listCount, clubDataLi, showCount;
  var displayInfo = document.querySelector(".display-info");
  var clubName = document.querySelector(".club-name");
  var infoContainer = document.querySelector(".club-info-container");
  var showMore = document.querySelector(".show-more a");

  //Using fetch function to get club data from api
  fetch(clubListURL).then(function (response) {
    //getting data from api
    return response.json();
  }).then(function (data) {
    //displaying output
    data.clubs.forEach(function (item) {
      var li = document.createElement("li");
      li.innerHTML = "<a href='#displayContainer' id='" + item.name + "'>" + item.name + "</a>";
      clublist.appendChild(li);
    });
  });

  //Using fetch function to get club info from api
  fetch(clubInfoURL).then(function (response) {
    //getting data from api
    return response.json();
  }).then(function (data) {
    clubData = data;
  });

  //showing club list onclick of clubs btn
  clubsBtn.addEventListener("click", function () {
    clublist.classList.add("show-list");
    //for ratating dropdown icon on click
    clubsBtnSpan.classList.add("rotate");
  });

  //eventlistner for club list 
  clublist.addEventListener("click", function (e) {
    clublist.classList.remove("show-list");
    clubsBtnSpan.classList.remove("rotate");
    selectedClub(e.target.id);
  });

  //Function for selected club 
  function selectedClub(selectedClubName) {
    infoContainer.classList.add("show");
    displayInfo.innerHTML = "";
    clubName.textContent = "";
    clubData.matches.forEach(function (item) {
      if ((item.team1 == selectedClubName) || (item.team2 == selectedClubName)) {
        clubName.textContent = selectedClubName;
        showMore.classList.add("show");
        var li = document.createElement("li");
        li.innerHTML = "<div class='cd-heading'><h4>Round : " + item.round + "</h4><h4>Date : " + item.date + "</h4></div>" + "<div class='cd-score'><span>" + item.team1 + "</span><span>VS</span><span>" + item.team2 + "</span></div>";
        displayInfo.appendChild(li);
        clubDataLi = displayInfo.childNodes;
        listCount = displayInfo.childNodes.length;
      }
      // else {
      //   clubName.textContent = "No data available for " + selectedClubName + " :(";
      //   showMore.classList.remove("show");
      // }
    });
    showCount = 5;
    showFive(showCount);
  }

  //function to show five 
  function showFive(count) {
    for (var i = 0; i < count; i++) {
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
}

//function for login page js
function matchDetailsPageJS() {
  var logOutBtn = document.querySelector(".logout a");
  var userEmail = localStorage.getItem('currentUserEmail') ? localStorage.getItem('currentUserEmail') : '';

  //for checking user is logged in or not
  if (userEmail == '') {
    alert('You need to login first!');
    location.href = "EPLLeague/../index.html";
  }

  //logout event listener
  logOutBtn.addEventListener("click", Logout);

  //function to logout
  function Logout() {
    localStorage.removeItem('currentUserEmail');
    localStorage.removeItem('currentUserPswd');
    location.href = "EPLLeague/../index.html";
  }

  var html = document.querySelector("html");
  var hamburger = document.querySelector(".hamburger");
  var hamBar = document.querySelector(".bar");
  var nav = document.querySelector("nav");

  //eventlistner for hamburger
  hamBar.addEventListener("click", openMenu);

  //function to open hamburger menu
  function openMenu() {
    html.classList.toggle("active-html");
    hamburger.classList.toggle("active-ham");
    nav.classList.toggle("active-nav");
  }

  //for keeping current nav tab active
  var currentPageURL = location.href;
  var currentPage = currentPageURL.toString().includes("matchdetails.html");
  var navUl = document.querySelector("nav ul");
  var navTabArr = document.querySelectorAll("nav a");

  navTabArr.forEach(function (item) {
    var tabHref = item.href.toString().includes("matchdetails.html");
    if (currentPage == true && tabHref == true) {
      item.classList.add("active-nav-tab");
    } else {
      item.classList.remove("active-nav-tab");
    }
  });
}
