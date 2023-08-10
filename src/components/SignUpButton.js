import React, { Component, useEffect } from 'react';
import './navbar.css';

function SignUpButton(props) {

    if (!props.token){
        return (
            <a 
                className="navigation-text" 
                id="navigation-login"
                onClick={props.ShowSignupPopup}
            >Sign Up</a>
        )
    }

    return (
        <></>
    )
}

export default SignUpButton