var uName = document.querySelector(".uName");
var logOutBtn = document.querySelector(".logout-btn");
let uEmail = localStorage.getItem('uEmail') ? localStorage.getItem('uEmail') : '';

logOutBtn.addEventListener("click", Logout);


if (uEmail == '') {
  alert('U need to login first');
  location.href = "loginpage.html";
}
function Logout() {
  localStorage.removeItem('fName');
  localStorage.removeItem('uEmail');
  localStorage.removeItem('newPswd');
  location.href = "loginpage.html";
}

uName.textContent = localStorage.getItem('fName');