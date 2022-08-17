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



















