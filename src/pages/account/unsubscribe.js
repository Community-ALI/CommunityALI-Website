// page that when redirected to, will unsubscribe the user from notifications
import React, { useRef, useEffect, useState } from 'react';
import { BASE_BACKEND_URL } from '../../config';


function Unsubscribe() {
    useEffect(() => 
    {
        document.title = 'Unsubscribe | Community ALI';
    }, []);
    const [success, setSuccess] = useState(false); // if the user was successfully unsubscribed

    // get the email from the url params, then send a request to the backend to unsubscribe the user
    const unsubscribeUser = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const email = urlParams.get('email');
        console.log(email);
        try {
            const response = await fetch(`${BASE_BACKEND_URL}/userdata/unsubscribe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
            });
            const result = await response.json();
            console.log(result);
            if (result.status === 'ok') {
                //everything is a okay
                console.log('unsubscribed user');
                setSuccess(true);
                // hide loader wrapper
                const loaderWrapper = document.querySelector('.loader-wrapper');
                loaderWrapper.style.transition = 'opacity 0.5s';
                loaderWrapper.style.opacity = '0';
                setTimeout(() => {
                    loaderWrapper.style.display = 'none';
                }, 500);
            } else {
                console.log(result.error);
                const loaderWrapper = document.querySelector('.loader-wrapper');
                loaderWrapper.style.transition = 'opacity 0.5s';
                loaderWrapper.style.opacity = '0';
                setTimeout(() => {
                    loaderWrapper.style.display = 'none';
                }, 500);
            }
        } catch (error) {
            console.error(error);
            alert('An error ocurred while unsubscribing.');
        }
    };

    
    unsubscribeUser();
    

    return (
        <div className="unsubscribe-container">
            {/* loading screen */}
            <div className="loader-wrapper">
                <span className="loader"><span className="loader-inner"></span></span>
            </div>
            {success ? (
                <div className="unsubscribe-success">
                    <div className="unsubscribe-success-title">You have been unsubscribed from notifications.</div>
                    <div className="unsubscribe-success-subtitle">You will no longer receive notifications when new applicants apply to your services.</div>
                </div>
            ) : (
                <div className="unsubscribe-failure">
                    <div className="unsubscribe-failure-title">An error occurred while unsubscribing.</div>
                    <div className="unsubscribe-failure-subtitle">Please contact us at <a href="mailto:communityalis@gmail.com">communityalis@gmail.com</a></div>
                </div>
            )}
        </div>
        
    );
}

export default Unsubscribe;