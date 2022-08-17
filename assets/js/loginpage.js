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

//for form validation
var signInForm = document.querySelector(".sign-in-form");
var signInBtn = document.querySelector(".sign-in-btn");
var email = document.getElementById("email");
var pswd = document.getElementById("pswd");

pswd.maxLength = 8;

signInForm.addEventListener("submit", submitForm);

function submitForm(e) {
  //preventing from load
  e.preventDefault();

  if (validateForm()) {
    location.replace("http://127.0.0.1:5500/homepage.html");
    form.reset();
  }
}

function validateForm() {

  var valid;
  valid = checkEmail(email, /^([_\-\.0-9a-zA-Z]+)@([_\-\.a-zA-Z]+)\.([a-zA-Z]){2,7}$/, "Please enter your email id", "Please enter valid email id");

  valid = checkPswd(pswd, /^(?=.{8,8}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/, "Please enter your password", "Please enter valid password");
  return valid;
}

//function for checking email
function checkEmail(input, regEx, emptyErr, validErr) {
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

//function for checking password
function checkPswd(input, regEx, emptyErr, validErr) {
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

email.addEventListener("blur", function () {
  checkEmail(email, /^([_\-\.0-9a-zA-Z]+)@([_\-\.a-zA-Z]+)\.([a-zA-Z]){2,7}$/, "Please enter your email id", "Please enter valid email id");
});

pswd.addEventListener("blur", function () {
  checkPswd(pswd, /^(?=.{8,8}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/, "Please enter your password", "Please enter valid password");
});














