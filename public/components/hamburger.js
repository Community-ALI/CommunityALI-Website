const hamburger = document.querySelector(".navigation-hamburger");
const menu = document.querySelector(".navigation-bar");
const menuWrapper = document.querySelector(".wrapper");

console.log(menu);

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    menuWrapper.classList.toggle("active");
    menu.classList.toggle("active");
})

document.querySelectorAll(".navigation-button").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    menuWrapper.classList.remove("active");
    menu.classList.remove("active");
}))

