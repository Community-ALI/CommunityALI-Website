const hamburger = document.querySelector(".navigation-hamburger");
const menu = document.querySelector(".navigation-bar");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    menu.classList.toggle("active");
})

document.querySelectorAll(".navigation-button").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    menu.classList.remove("active");
}))
