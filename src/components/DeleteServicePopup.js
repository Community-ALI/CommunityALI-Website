import React, { Component, useEffect, useState } from 'react';
import {BASE_BACKEND_URL} from '../config.js'
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
                const response = await fetch(`${BASE_BACKEND_URL}/userdata/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(authData),
                });
                const result = await response.json();
                
                if (result.status === 'ok') {
                    //everything is a okay
                    var token = result.data;
                    const response = await fetch(`${BASE_BACKEND_URL}/servicedata/delete-service?service=${props.serviceTitle}`,
                        {
                        method: 'POST',
                        headers: {
                        'Authorization': `Bearer ${token}`
                        }
                    })
                    .then(response => response.json())
                    .then(data => {
                    })
                    
                    window.location.href = '/my-services';
                    
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
                        <h1 id="delete-header" >Are you sure you want to delete "{props.serviceTitle}"? THIS ACTION CANNOT BE UNDONE ONCE DELETED! </h1>
                        <form id="login" onSubmit={deleteService}>
                            <div className="text-field">
                                <input 
                                    className="text-field-input"
                                    autoComplete='false'
                                    id="usernameOrEmail" 
                                    placeholder='Enter Username or Email'
                                    required=""
                                    onChange={e => {
                                        setUsernameOrEmail(e.target.value);
                                    }}
                                    />
                                <span className="text-field-span"></span>
                                {/* <label className="text-field-label">Username or Email</label> */}
                            </div>
                            <div className="text-field">
                                <input 
                                    className="text-field-input"
                                    type="password" 
                                    id="password" 
                                    autoComplete='false'
                                    placeholder='Enter Password'
                                    required=""
                                    onChange={e => {
                                        setPassword(e.target.value);
                                    }}
                                    />
                                <span className="text-field-span" ></span>
                                {/* <label className="text-field-label">Password</label> */}
                            </div>
                    
                            {/* <!-- <div class="pass">Forgot Password?</div> --> */}
                            <input 
                                type="submit" 
                                value="Delete" 
                                id='login-submission'
                                className='delete-button-service-main-page'
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