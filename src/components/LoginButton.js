import React, { Component, useEffect } from 'react';
import './navbar.css';
import UserProfileCircle from './user-profile';

function LoginButton(props) {

    if (!props.token){
        return (
            <a 
                className="navigation-button navigation-text" 
                onClick={props.ShowLoginPopup}
                style={{cursor:'pointer'}}
                id="navigation-login"
            >Login</a>
        )
    }

    return (
        <UserProfileCircle ShowLoginPopup={showLoginPopup} token={token} Logout={Logout} />
    )
}

export default LoginButton