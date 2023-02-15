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


document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Get the form data
    let formData = new FormData();
    formData.append("name", document.querySelector("#name").value);
    formData.append("email", document.querySelector("#email").value);
    formData.append("w_number", document.querySelector("#w_number").value);
    
    // Modify the data
    formData.append("newVariable", "value");
    

    const searchParams = new URLSearchParams(window.location.search);
    const service = searchParams.get('service');


    alert(document.querySelector("#name").value)
    // janky url info thingy 
    // FIXME make it work better
    url = "/apply-for-service?service="
    url += service
    url += "&name="
    url += document.querySelector("#name").value
    url += "&email="
    url += document.querySelector("#email").value
    url += "&w_number="
    url += document.querySelector("#w_number").value

    // Send the data to the server
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.send(formData); // WHY IT NO WORK
  });