import React, { Component, useEffect, useState, useRef} from 'react';
import '../../pages/explore-services/signup-success.css'
import NavBar from '../../components/NavBar';
import Footer from "../../components/Footer";

function SignupSuccess() {
    return(
        <div>
            <NavBar />,
            <div className='sign-up-success-container'>
                <div className="title">
                    <p>
                    Your application has been sent successfully
                    </p>
                </div>,

                <div className="description">
                    <p>
                    Thank for using Community ALI. The service will contact you for more details. 
                    <br></br>
                    Click this button to head back to our main page!
                    </p>
                </div>,

                <div className="button-container">
                    <a className="button" href="/"> Main Page </a>
                </div> 
            </div>,
            <Footer />
        </div>
    )
}

export default SignupSuccess;