import React, { Component, useEffect } from 'react';
import './navbar.css';
import LoginPopup from './LoginPopup';

function SignUpButton(props) {

    if (!props.token){
        return (
            <a 
                className="navigation-button navigation-text" 
                id="navigation-login"
            >Sign Up</a>
        )
    }

    return (
        <></>
    )
}

export default SignUpButton