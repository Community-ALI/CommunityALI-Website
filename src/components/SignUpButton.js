import React, { Component, useEffect } from 'react';
import './navbar.css';

function SignUpButton(props) {

    if (!props.token){
        return (
            <button 
                className="navigation-text" 
                id="navigation-login"
                onClick={props.ShowSignupPopup}
            >Sign Up</button>
        )
    }

    return (
        <></>
    )
}

export default SignUpButton