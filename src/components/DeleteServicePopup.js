import React, { Component, useEffect, useState } from 'react';
import './login.css';

function DeleteServicePopup(props) {

    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');


        async function deleteService(event) {
            event.preventDefault();
            const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            let authData;
            if (validEmailRegex.test(usernameOrEmail)) {
                authData = { usernameOrEmail, password }
            } else {
                authData = { usernameOrEmail, password }
            }

            
            try {
                const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(authData),
                });
                const result = await response.json();
                
                if (result.status === 'ok') {
                    //everything is a okay
                    console.log('Got the token: ', result.data);
                    var token = result.data;
                    const response = await fetch(`http://localhost:3000/delete-service?service=${props.serviceTitle}`,
                        {
                        method: 'POST',
                        headers: {
                        'Authorization': `Bearer ${token}`
                        }
                    })
                    .then(response => response.json())
                    .then(data => {
                    })
                    
                    window.location.href = '/services';
                    
                } else {
                    console.log(result.error);
                    alert(result.error);
                }
            } catch (error) {
                console.error(error);
                alert('An error ocurred.');
            }
        }

    // enterPassword(enteredPassword) {

    // }

    if (props.isShowingServiceDeletePopup) {
        return (
                <div className='container-login'>
                    <div className="container-for-login">
                        <h1>Are you sure you want to delete "{props.serviceTitle}"?</h1>
                        <form autoComplete='off' id="login" onSubmit={deleteService}>
                            <div className="text-field">
                                <input 
                                    className="text-field-input"
                                    autoComplete='false'
                                    id="usernameOrEmail" 
                                    required=""
                                    onChange={e => {
                                        setUsernameOrEmail(e.target.value);
                                    }}
                                    />
                                <span className="text-field-span"></span>
                                <label className="text-field-label">Username or Email</label>
                            </div>
                            <div className="text-field">
                                <input 
                                    className="text-field-input"
                                    type="password" 
                                    id="password" 
                                    autoComplete='false'
                                    required=""
                                    onChange={e => {
                                        setPassword(e.target.value);
                                    }}
                                    />
                                <span className="text-field-span" ></span>
                                <label className="text-field-label">Password</label>
                            </div>
                    
                            {/* <!-- <div class="pass">Forgot Password?</div> --> */}
                            <input 
                                type="submit" 
                                value="Delete" 
                                id='login-submission'
                            />
                            <div className="signup_link">
                                {/* left this for spacing */}
                            </div>
                        </form>
                    </div>
                </div>
        )
    }

    return null;
}

export default DeleteServicePopup;