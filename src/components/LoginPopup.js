import React, {useState } from 'react';
import {BASE_BACKEND_URL} from '../config.js'
import './login.css';
import SignupPopup from './SignupPopup.js';
function LoginPopup(props) {

    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isShowingSignupPopup, setIsShowingSignupPopup] = useState(false);

    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleSignupClick = () => {
        setIsShowingSignupPopup(true);
      };

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
      };

        async function login(event) {
            event.preventDefault();
            const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            let authData;
            if (validEmailRegex.test(usernameOrEmail)) {
                authData = { usernameOrEmail, password }
            } else {
                authData = { usernameOrEmail, password }
            }

            
            try {
                const response = await fetch(`${BASE_BACKEND_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(authData),
                });
                const result = await response.json();

                if (result.status === 'ok') {
                    //everything is a okay
                    localStorage.setItem('token', result.data);
                    const decodedToken = JSON.parse(atob(result.data.split('.')[1]));
                    console.log('signed in as: '+ decodedToken.username);
                    window.location.href = '/';
                } else {
                    console.log(result.error);
                    alert(result.error);
                }
            } catch (error) {
                console.error(error);
                alert('An error ocurred while logging in.');
            }
        }

    // enterPassword(enteredPassword) {

    // }

    if (props.isShowingLoginPopup && !isShowingSignupPopup) {
        return (
                <div className='container-login'>
                    <div className="container-for-login">
                        <h1>Login</h1>
                        <form id="login" onSubmit={login}>
                            <div className="text-field">
                                <input 
                                    autoComplete="off"
                                    className="text-field-input"
                                    id="usernameOrEmail" 
                                    required=""
                                    onChange={e => {
                                        setUsernameOrEmail(e.target.value);
                                    }}
                                    />
                                <span className={`text-field-span${(usernameOrEmail != '') ? ' focused-field' : ''}`}></span>
                                <label className={`text-field-label${(usernameOrEmail != '') ? ' focused-field' : ''}`} htmlFor="usernameOrEmail">Username or Email</label>
                            </div>
                            <div className="text-field">
                                <input 
                                    autoComplete="off"
                                    className="text-field-input"
                                    type={passwordVisible ? "text" : "password"} // Use the "text" type when passwordVisible is true
                                    id="password" 
                                    required=""
                                    onChange={e => {
                                        setPassword(e.target.value);
                                    }}
                                    />
                                    <i
                                        className={`fa-solid ${passwordVisible ? "fa-eye" : "fa-eye-slash"}`}
                                        id="password-eye"
                                        onClick={togglePasswordVisibility} // Add the onClick event to toggle the password visibility
                                    />

                                <span className={`text-field-span${(password != '') ? ' focused-field' : ''}`}></span>
                                <label className={`text-field-label${(password != '') ? ' focused-field' : ''}`} htmlFor="password">Password</label>
                            </div>
                    
                            {/* <!-- <div class="pass">Forgot Password?</div> --> */}
                            <input 
                                type="submit" 
                                value="Login" 
                                id='login-submission'
                                className="login-submit-button"
                            />
                            <div class="signup_link">
                                <p>Don't have an account? </p>
                                <button style={{ color: 'blue', textDecoration: 'underline' }} onClick={handleSignupClick}>Sign Up</button>
                            </div> 
                            <div className="signup_link">
                                Do you own a club and can't log into your account? Contact us - techsupport@communityali.org
                            </div>
                        </form>
                    </div>
                </div>
        )
    }
    else if (props.isShowingLoginPopup && isShowingSignupPopup){
        return <SignupPopup setIsShowingSignupPopup={setIsShowingSignupPopup} />
    }

    return null;
}

export default LoginPopup;