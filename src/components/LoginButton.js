import React, { Component, useEffect } from 'react';
import './navbar.css';
import UserProfileCircle from './user-profile';

function LoginButton(props) {    
    function Logout(){
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    return (
        <UserProfileCircle username={username} imageUrl={imageUrl} ShowLoginPopup={showLoginPopup} token={token} Logout={Logout} />
    )
}

export default LoginButton