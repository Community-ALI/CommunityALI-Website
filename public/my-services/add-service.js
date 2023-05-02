const service_form = document.getElementById('form');
const files = document.getElementById("files");

const fileInputJS2 = document.getElementById('file-input');
const fileContainerJS2 = document.getElementById('file-container');
// make the file input visible
fileInputJS2.addEventListener('change', () => {
  if (fileInput.value) {
    fileContainerJS2.classList.add('file-selected');
    alert('file detected');
  } else {
    fileContainerJS2.classList.remove('file-selected');
  }
});

// once image is ready to send
onLoadFunction = function(image, file){
    file = files.files[0];
    // Check if the image size is "close" to 1200 x 800
    const width = image.naturalWidth;
    const height = image.naturalHeight;
    const aspectRatio = width / height;
    const targetAspectRatio = 1200 / 800;
    const maxAspectRatioDiff = 0.1; // the allowable difference
    if (aspectRatio < targetAspectRatio - maxAspectRatioDiff || aspectRatio > targetAspectRatio + maxAspectRatioDiff) {
        alert("The image must be close to 1200 x 800.");
        return;
    }

    // If the image size is okay, proceed with the file upload
    // Create a new FormData object
    const formData = new FormData();

    // Append form data to the FormData object
    // formData.append("personal_name", document.getElementById("personal-name").value);
    // formData.append("personal_number", document.getElementById("personal-number").value);
    // formData.append("personal_email", document.getElementById("personal-email").value);
    // formData.append("personal_role", document.getElementById("personal-role").value);
    formData.append("title", document.getElementById("title").value);
    formData.append("details_location", document.getElementById("details-location").value);
    formData.append("details_times", document.getElementById("details-times").value);
    formData.append("details_date", document.getElementById("details-date").value);
    formData.append("description", document.getElementById("description").value);
    // formData.append("author", document.getElementById("author").value);
    // formData.append("president_email", document.getElementById("president-email").value);
    // formData.append("vice_president_name", document.getElementById("vice-president-name").value);
    // formData.append("vice_president_email", document.getElementById("vice-president-email").value);
    // formData.append("ICC_rep_name", document.getElementById("ICC-rep-name").value);
    // formData.append("ICC_rep_email", document.getElementById("ICC-rep-email").value);
    // formData.append("advisor_name", document.getElementById("advisor-name").value);
    // formData.append("advisor_email", document.getElementById("advisor-email").value);


    
    formData.append("files", file);

    fetch("/upload-service", {
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': `Bearer ${token}`
            }
    })
    .then((res) => {
        console.log(res);
        // Check the response status
        if (res.ok) {
            // Redirect to new window after server response
            window.location.href = '/service-search';
        } else {
            // Handle server error
            console.error("Error occurred", res);
        }
    })
    .catch((err) => {
        console.error("Error occurred", err);
    })
    .finally(() => {
        URL.revokeObjectURL(image.src);
    });

}


// when submit clicked
service_form.addEventListener('submit', function (event) {
    event.preventDefault();
    alert('form submitted');
    token = localStorage.getItem('token');
    if (token){
        // get values
        file = files.files[0]; // get the image file
        if ( file != undefined){
            // check that image is image
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!allowedTypes.includes(file.type)) {
                alert('Please upload an image file (JPEG, PNG, or GIF).');
                return;
            }
            const image = new Image();
            image.src = URL.createObjectURL(file);
            image.onload = function() {
                onLoadFunction(image);
            }
        }
        else{
            const image = new Image();
            image.src = 'resources/noPhoto.jpg';
            image.onload = function() {
                onLoadFunction(image);
            }
        }
        
        

        
    }
    else{ // if no token
        alert("Account error. Service not posted.")
    }
});