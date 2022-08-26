//for sign in form validation
var signInForm = document.querySelector(".sign-in-form");
var signInBtn = document.querySelector(".sign-in-btn");
var email = document.getElementById("email");
var pswd = document.getElementById("pswd");

//For alert messages
var close = document.querySelector(".closebtn");
var alertBox = document.querySelector(".alert");
var alertMsg = document.querySelector(".alert h3");

var userEmail = "user1@gmail.com";
var userPswd = "User0001";

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
    location.href = "../index.html";
  }

}

//saving user data
saveData();

//for keeping user log in if he alerady logged in
var checkUserEmail = localStorage.getItem('userEmail') ? localStorage.getItem('userEmail') : '';
if (checkUserEmail != '') {
  location.href = "../homepage.html";
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
    errSpan.textContent = "";
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
    location.href = "../homepage.html";
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