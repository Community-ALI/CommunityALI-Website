const files = document.getElementById("files");

form.addEventListener('submit', function (event) {
    event.preventDefault();
    alert("test");
    const name = document.getElementById("name");
    const file = files.files[0];
    
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
        alert('Please upload an image file (JPEG, PNG, or GIF).');
        return;
    }

    // Create a new Image object and set its source to the uploaded file
    const image = new Image();
    image.src = URL.createObjectURL(file);

    image.onload = function() {
        // Check if the image size is close to 1200 x 800
        const width = image.naturalWidth;
        const height = image.naturalHeight;
        const aspectRatio = width / height;
        const targetAspectRatio = 1200 / 800;
        const maxAspectRatioDiff = 0.1; // You can adjust this to fit your needs
        if (aspectRatio < targetAspectRatio - maxAspectRatioDiff || aspectRatio > targetAspectRatio + maxAspectRatioDiff) {
            alert("The image must be close to 1200 x 800.");
            return;
        }

        // If the image size is okay, proceed with the file upload
        const formData = new FormData();
        formData.append("name", name.value);
        formData.append("files", file);
        
        fetch("http://localhost:3000/upload-files", {
            method: 'POST',
            body: formData,
            headers: {
                // "Content-Type": "multipart/form-data"
            }
        })
        .then((res) => console.log(res))
        .catch((err) => ("Error occured", err));

        // Free the memory used by the Image object
        URL.revokeObjectURL(image.src);
    };
});
