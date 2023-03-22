const form = document.getElementById('form')
form.addEventListener('submit', login)

function login(event) {
    event.preventDefault()
    const usernameOrEmail = document.getElementById('usernameOrEmail').value;
    // const username = document.getElementById('usernameOrEmail').value
    const password = document.getElementById('password').value
    const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    let authData
    if (validEmailRegex.test(usernameOrEmail)) {
        authData = { usernameOrEmail, password }
    } else {
        authData = { usernameOrEmail, password }
    }

    try {
        const response = fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(authData)
        });
        const result = response.json();

        if (result.status === 'ok') {
            //everything is a okay
            console.log('Got the token: ', result.data)
            localStorage.setItem('token', result.data)
            alert('Success');
            sessionStorage.setItem('username', result.username);
            window.location.href = 'welcome.html'
        } else {
            alert(result.error);
        }
    } catch (error) {
        console.error(error);
        alert('An error ocurred while logging in.');
    }
}