import React, { Component, useEffect } from 'react';
import './navbar.css';
import UserProfileCircle from './user-profile';

function LoginButton(props) {

    if (!props.token){
        return (
            <button 
                className="navigation-text" id='navbar-login' 
                onClick={props.ShowLoginPopup}
            >Login</button>
        )
    }

    return (
        <UserProfileCircle ShowLoginPopup={props.showLoginPopup} token={props.token} />
    )
}

export default LoginButton