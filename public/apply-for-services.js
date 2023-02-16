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


const form = document.getElementById('form');
form.addEventListener('submit', function (event) {
    event.preventDefault();

    const searchParams = new URLSearchParams(window.location.search);
    const service = searchParams.get('service');
    const name =  document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const w_number = document.getElementById("w_number").value;

    let xhr = new XMLHttpRequest();
    let url = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/send-application";
    xhr.open("POST", url);

    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    let data = "service="+service+"&name="+name+"&email="+email+"&w_number="+w_number;

    xhr.onload = () => document.body.innerHTML = (xhr.responseText);

    xhr.send(data);
});