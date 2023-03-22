const form = document.getElementById('form');
const files = document.getElementById("files");

form.addEventListener('submit', function (event) {
    event.preventDefault();


    const title =  document.getElementById("title").value;
    const details_location = document.getElementById("details-location").value;
    const details_times = document.getElementById("details-times").value;
    const details_date = document.getElementById("details-date").value;
    const description = document.getElementById("description").value;
    const author = document.getElementById("author").value;
    const president_email = document.getElementById("president-email").value;
    const vice_president_name = document.getElementById("vice-president-name").value;
    const vice_president_email = document.getElementById("vice-president-email").value;
    const ICC_rep_name = document.getElementById("ICC-rep-name").value;
    const ICC_rep_email = document.getElementById("ICC-rep-email").value;
    const advisor_name = document.getElementById("advisor-name").value;
    const advisor_email = document.getElementById("advisor-email").value;

    const file = files.files[0]; // get the image file

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
    alert('Please upload an image file (JPEG, PNG, or GIF).');
    return;
    }

    const image = new Image();
    image.src = URL.createObjectURL(file);
    image.onload = function() {

        // ensure that the file is an image

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

        formData.append("title", title);
        formData.append("details_location", details_location);
        formData.append("details_times", details_times);
        formData.append("details_date", details_date);
        formData.append("description", description);
        formData.append("author", author);
        formData.append("president_email", president_email);
        formData.append("vice_president_name", vice_president_name);
        formData.append("vice_president_email", vice_president_email);
        formData.append("ICC_rep_name", ICC_rep_name);
        formData.append("ICC_rep_email", ICC_rep_email);
        formData.append("advisor_name", advisor_name);
        formData.append("advisor_email", advisor_email);

        formData.append("files", file);

        fetch("/upload-service", {
            method: 'POST',
            body: formData
        })
        .then((res) => console.log(res))
        .catch((err) => ("Error occured", err));
        URL.revokeObjectURL(image.src);
    };
    
});