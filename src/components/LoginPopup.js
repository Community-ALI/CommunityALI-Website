import React, { Component, useState } from 'react';
import './login.css';

function LoginPopup(props) {
    if (props.isShowingLoginPopup) {
        return (
                <div className='container-login'>
                    <div className="container">
                        <h1>Login</h1>
                        <form id="login">
                                <div className="txt_field">
                                <input id="usernameOrEmail" required=""/>
                                <span></span>
                                <label>Username or Email</label>
                            </div>
                                <div className="txt_field">
                                <input type="password" id="password" required=""/>
                                <span></span>
                                <label>Password</label>
                            </div>
                    
                            {/* <!-- <div class="pass">Forgot Password?</div> --> */}
                            <input type="submit" value="Login" id='login-submission'/>
                            {/* <!-- <div class="signup_link">
                            Don't have an account? <a href="signup.html">Sign-up</a>
                            </div> --> */} 
                            <div className="signup_link">
                                Do you own a club and can't log into your account? Contact us - communityalis@gmail.com
                            </div>
                        </form>
                    </div>
                </div>
        )
    }

    return null;
}

export default LoginPopup;