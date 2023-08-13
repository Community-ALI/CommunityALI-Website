import React, { Component, useEffect, useState, useRef} from 'react';
import '../../pages/explore-services/signup-success.css'
import NavBar from '../../components/NavBar';
import Footer from "../../components/Footer";

function SignupSuccess() {
    return(
        <div>
            <title> Sign-Up Success Page </title>
            <NavBar />,
            <div id ='sign-up-success-container'>
                <div id="sign-up-success-title">
                    <p>
                    Your application has been sent successfully
                    </p>
                </div>
                <div id="sign-up-success-description">
                    <p>
                    Thank for using Community ALI. You will be contacted for further details. 
                    <br></br>
                    Click this button to head back to our home page!
                    </p>
                </div>
                <div id="sign-up-success-button-container">
                    <a id="sign-up-success-button" href="/"> Home Page </a>
                </div> 
            </div>
        </div>
    )
}

export default SignupSuccess;