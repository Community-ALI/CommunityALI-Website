
form.addEventListener('submit', function (event) {
    event.preventDefault();
    alert("test");
    const name = document.getElementById("name");
    const files = document.getElementById("files");
    const formData = new FormData();
    formData.append("name", name.value);
    for(let i =0; i < files.files.length; i++) {
            formData.append("files", files.files[i]);
    }
    
    fetch("http://localhost:3000/upload-files", {
        method: 'POST',
        body: formData,
        headers: {
        //   "Content-Type": "multipart/form-data"
        }
    })
        .then((res) => console.log(res))
        .catch((err) => ("Error occured", err));
});