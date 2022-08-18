//for tab functionality
var tabs = document.querySelectorAll(".tab-list li");
var tabContent = document.querySelectorAll(".tab-content");

tabs.forEach(function (item, idx) {
  item.addEventListener("click", function () {
    removeClass();
    this.classList.add("active-tab");
    tabContent[idx].classList.add("show");
  });
});

function removeClass() {
  tabs.forEach(function (item, idx) {
    item.classList.remove("active-tab");
    tabContent[idx].classList.remove("show");
  });
}

//for sign in form validation
var signInForm = document.querySelector(".sign-in-form");
var signInBtn = document.querySelector(".sign-in-btn");
var email = document.getElementById("email");
var pswd = document.getElementById("pswd");

//For alert messages
var close = document.querySelector(".closebtn");
var alertBox = document.querySelector(".alert");

close.addEventListener('click', function () {
  var parentAlert = close.parentElement;
  parentAlert.classList.remove("show");
});

pswd.maxLength = 8;

signInForm.addEventListener("submit", signIn);

//for keeping user log in if he alerady logged in
let userEmail = localStorage.getItem('uEmail') ? localStorage.getItem('uEmail') : '';
if (userEmail != '') {
  location.href = "../homepage.html";
}

//function to sign in
function signIn(e) {
  //preventing from load
  e.preventDefault();

  if (validateSignIn()) {
    checkUserDetails();
    // location.href = "../homepage.html";
    signInForm.reset();
  }
}

function checkUserDetails() {
  email = email.value;
  pswd = pswd.value;

  let user_records = new Array();
  user_records = JSON.parse(localStorage.getItem("users")) ? JSON.parse(localStorage.getItem("users")) : [];
  if (user_records.some(function (v) { return v.uEmail == email && v.newPswd == pswd })) {
    let current_user = user_records.filter(function (v) { return v.uEmail == email && v.newPswd == pswd })[0];
    localStorage.setItem('fName', current_user.fName);
    localStorage.setItem('uEmail', current_user.uEmail);
    localStorage.setItem('newPswd', current_user.newPswd);
    location.href = "../homepage.html";
  }
  else {
    alertBox.classList.add("show");
  }

}

//function to validate sign in
function validateSignIn() {
  var valid;
  valid = checkInput(email, /^([_\-\.0-9a-zA-Z]+)@([_\-\.a-zA-Z]+)\.([a-zA-Z]){2,7}$/, "Please enter your email id", "Please enter valid email id");

  valid = checkInput(pswd, /^(?=.{8,8}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/, "Please enter your password", "Please enter valid password");
  return valid;
}

//function for checking input
function checkInput(input, regEx, emptyErr, validErr) {
  var value = input.value.trim();
  var errSpan = input.nextElementSibling;
  errSpan.classList.add("show");
  if (value == null || value == "") {
    errSpan.textContent = emptyErr;
  } else if (!regEx.test(input.value)) {
    errSpan.textContent = validErr;
  } else {
    errSpan.textContent = "";
    errSpan.classList.remove("show");
    return valid = true;
  }
  return valid = false;
}

//eventlistners to check validation runtime
email.addEventListener("blur", function () {
  checkInput(email, /^([_\-\.0-9a-zA-Z]+)@([_\-\.a-zA-Z]+)\.([a-zA-Z]){2,7}$/, "Please enter your email id", "Please enter valid email id");
});

pswd.addEventListener("blur", function () {
  checkInput(pswd, /^(?=.{8,8}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/, "Please enter your password", "Please enter valid password");
});


//for sign up form validation
var signUpForm = document.querySelector(".sign-up-form");
var signUpBtn = document.querySelector(".sign-up-btn");
var fName = document.getElementById("fName");
var lName = document.getElementById("lName");
var uEmail = document.getElementById("uEmail");
var newPswd = document.getElementById("newPswd");
var pswdMsg = document.querySelector(".pswd-msg");
var genderDiv = document.querySelector(".gender-radio-grup");
var genderOpt = document.getElementsByName("gender");
var dob = document.getElementById("dob");
var phone = document.getElementById("phone");

var letter = document.querySelector(".letter");
var capital = document.querySelector(".capital");
var number = document.querySelector(".number");
var length = document.querySelector(".length");

newPswd.maxLength = 8;
phone.maxLength = 10;

signUpForm.addEventListener("submit", signUp);

//function to sign up
function signUp(e) {
  //preventing from load
  e.preventDefault();

  if (validateSignUp()) {
    saveData();
    signUpForm.reset();
  }
}

//function to save data in local storage 
function saveData() {
  fName = fName.value;
  lName = lName.value;
  uEmail = uEmail.value;
  newPswd = newPswd.value;
  dob = dob.value;
  phone = phone.value;
  for (i = 0; i < genderOpt.length; i++) {
    if (genderOpt[i].checked)
      genderOpt = genderOpt[i].value;
  }

  //creating new array for user record
  let user_records = new Array();
  user_records = JSON.parse(localStorage.getItem("users")) ? JSON.parse(localStorage.getItem("users")) : [];

  //checking for duplicate data
  if (user_records.some(function (v) { return v.uEmail == uEmail && v.newPswd == newPswd })) {
    alert("Duplicate data! please enter another details");
  }
  else {
    user_records.push({
      "fName": fName,
      "lName": lName,
      "uEmail": uEmail,
      "newPswd": newPswd,
      "dob": dob,
      "phone": phone,
      "gender": genderOpt
    })
    localStorage.setItem("users", JSON.stringify(user_records));
    location.href = "../loginpage.html";
  }

}

//function to validate sign in
function validateSignUp() {
  var valid;

  valid = checkInput(fName, /^[a-zA-Z]([a-zA-Z ])*$/, "Please enter your first name", "Please enter valid first name");
  valid = checkInput(lName, /^[a-zA-Z]([a-zA-Z ])*$/, "Please enter your last name", "Please enter valid last name");
  valid = checkInput(uEmail, /^([_\-\.0-9a-zA-Z]+)@([_\-\.a-zA-Z]+)\.([a-zA-Z]){2,7}$/, "Please enter your email id", "Please enter valid email id");
  valid = checkInput(newPswd, /^(?=.{8,8}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/, "Please enter your password", "Please enter valid password");
  valid = checkRadioGrup(genderOpt, genderDiv, "Please select your gender");
  valid = checkDOB(dob, "Please enter your date of birth");
  valid = checkInput(phone, /^(\+91[\-\s]?)?[0]?(91)?[789]\d{4}.?\d{5}$/, "Please enter your phone number", "Phone number must be 10 digit long");
  return valid;
}

//for checking radio grups
function checkRadioGrup(input, inputDiv, emptyErr) {
  var errSpan = inputDiv.lastElementChild;
  errSpan.classList.add("show");
  if (!(input[0].checked || input[1].checked || input[2].checked)) {
    errSpan.textContent = emptyErr;
    return valid = false;
  } else {
    errSpan.textContent = "";
    errSpan.classList.remove("show");
    return valid = true;
  }
}

//for checking dob
function checkDOB(input, emptyErr) {
  var value = input.value;
  var errSpan = input.nextElementSibling;
  errSpan.classList.add("show");
  if (value == null || value == "") {
    errSpan.textContent = emptyErr;
  } else {
    errSpan.textContent = "";
    errSpan.classList.remove("show");
    return valid = true;
  }
  return valid = false;
}

fName.addEventListener("blur", function () {
  checkInput(fName, /^[a-zA-Z]([a-zA-Z ])*$/, "Please enter your first name", "Please enter valid first name");
});

lName.addEventListener("blur", function () {
  checkInput(lName, /^[a-zA-Z]([a-zA-Z ])*$/, "Please enter your last name", "Please enter valid last name");
});

uEmail.addEventListener("blur", function () {
  checkInput(uEmail, /^([_\-\.0-9a-zA-Z]+)@([_\-\.a-zA-Z]+)\.([a-zA-Z]){2,7}$/, "Please enter your email id", "Please enter valid email id");
});

phone.addEventListener("blur", function () {
  checkInput(phone, /^(\+91[\-\s]?)?[0]?(91)?[789]\d{4}.?\d{5}$/, "Please enter your phone number", "Phone number must be 10 digit long");
});

newPswd.addEventListener("focus", function () {
  pswdMsg.classList.add("show");
});

newPswd.addEventListener("blur", function () {
  pswdMsg.classList.remove("show");
  checkInput(newPswd, /^(?=.{8,8}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/, "Please enter your password", "Please enter valid password");
});

newPswd.addEventListener("keyup", function () {

  // Validate lowercase letters
  var lowerCaseLetters = /[a-z]/g;
  if (newPswd.value.match(lowerCaseLetters)) {
    letter.classList.remove("invalid");
    letter.classList.add("valid");
  } else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
  }

  // Validate capital letters
  var upperCaseLetters = /[A-Z]/g;
  if (newPswd.value.match(upperCaseLetters)) {
    capital.classList.remove("invalid");
    capital.classList.add("valid");
  } else {
    capital.classList.remove("valid");
    capital.classList.add("invalid");
  }

  // Validate numbers
  var numbers = /[0-9]/g;
  if (newPswd.value.match(numbers)) {
    number.classList.remove("invalid");
    number.classList.add("valid");
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
  }

  // Validate length
  if (newPswd.value.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
  }
});