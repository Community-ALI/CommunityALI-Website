token = localStorage.getItem('token');
    if (token){
        console.log("sending request");
        fetch('/view-my-services', {
            headers: {
            'Authorization': `Bearer ${token}`
            }
    })
    .then(response => response.text())
    .then(html => {
        const target = document.getElementById('target');
        target.innerHTML = html;
    })
        .catch(error => {
    });
    }
    else{
        alert('There was an error verifying your account. Please log back in to view your services.')
}