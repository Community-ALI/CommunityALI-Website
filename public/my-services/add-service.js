const service_form = document.getElementById('form');
const service_image = document.getElementById("file-input");

const fileInputJS2 = document.getElementById('file-input');
const fileContainerJS2 = document.getElementById('file-container');
// make the file input visible
fileInputJS2.addEventListener('change', () => {
  if (fileInput.value) {
    fileContainerJS2.classList.add('file-selected');
  } else {
    fileContainerJS2.classList.remove('file-selected');
  }
});

// once image is ready to send
onLoadFunction = function(image, file){
    file = service_image.files[0];
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
    
    formData.append("title", document.getElementById("title").value);
    formData.append("details_location", document.getElementById("details-location").value);
    formData.append("details_times", document.getElementById("details-times").value);
    formData.append("details_date", document.getElementById("details-date").value);
    formData.append("description", document.getElementById("description").value);
    formData.append("author", document.getElementById("meeting-details-title-box").value);
    

    const contact_name_1 = document.getElementById("contact-name-1").value;
    const contact_email_1 = document.getElementById("contact-email-1").value;
    const contact_role_1 = document.getElementById("contact-role-1").value;
    const contact1 = "<u> "+contact_role_1 + "</u> : " + contact_name_1 + "  :  " + contact_email_1;

    
    const contact_name_2 = document.getElementById("contact-name-2").value;
    const contact_email_2 = document.getElementById("contact-email-2").value;
    const contact_role_2 = document.getElementById("contact-role-2").value;
    const contact2 = "<u> "+contact_role_2 + "</u> : " + contact_name_2 + "  :  " + contact_email_2;

    
    const contact_name_3 = document.getElementById("contact-name-3").value;
    const contact_email_3 = document.getElementById("contact-email-3").value;
    const contact_role_3 = document.getElementById("contact-role-3").value;
    const contact3 = "<u> "+contact_role_3 + "</u> : " + contact_name_3 + "  :  " + contact_email_3;


    const contact_name_4 = document.getElementById("contact-name-4").value;
    const contact_email_4 = document.getElementById("contact-email-4").value;
    const contact_role_4 = document.getElementById("contact-role-4").value;
    const contact4 = "<u> "+contact_role_4 + "</u> : " + contact_name_4 + "  :  " + contact_email_4;


    var contactsArray = [contact1, contact2, contact3, contact4];
    formData.append("contacts", JSON.stringify(contactsArray));
    
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
            window.location.href = '/explore-services/main-page';
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
    token = localStorage.getItem('token');
    if (token){
        // get values
        file = service_image.files[0]; // get the image file
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
            image.src = '../resources/noPhoto.jpg';
            image.onload = function() {
                onLoadFunction(image);
            }
        }
        
        

        
    }
    else{ // if no token
        alert("Account error. Service not posted.")
    }
});