const hamburger = document.querySelector(".hamburg"),
      menu = document.querySelector(".menu"),
      closeBtn = document.querySelector(".menu__close"),
      links = document.querySelectorAll(".menu__items_link"),
      progressCount = document.querySelectorAll('.experience__progress_count'),
      progressRange = document.querySelectorAll('.experience__progress_range span');

hamburger.addEventListener("click", function () {
    menu.classList.add("active");
})
closeBtn.addEventListener("click", function () {
    menu.classList.remove("active");
})

links.forEach(link => {
    link.addEventListener("click", function () {
        menu.classList.remove("active");
    })
})

function showProgressRange () { 
    progressCount.forEach((count, i) => progressRange[i].style.width = count.textContent)
}
showProgressRange();
