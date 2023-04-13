const form = document.getElementById('form');
form.addEventListener('submit', function (event) {
    event.preventDefault();

    const searchParams = new URLSearchParams(window.location.search);
    const service = searchParams.get('service');
    const name =  document.getElementById("name").value;
    const email = document.getElementById("email").value;
    // const w_number = document.getElementById("w_number").value;

    let xhr = new XMLHttpRequest();
    let url = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/send-application";
    xhr.open("POST", url);

    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    let data = "service="+service+"&name="+name+"&email="+email+"&w_number=";

    xhr.onload = () => window.location.href=(xhr.responseText);

    xhr.send(data);
});