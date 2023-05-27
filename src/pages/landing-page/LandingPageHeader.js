import React, { Component } from 'react';
import video from '../../../public/videos//Webvideo ULTRA COMPRESSED.mp4'
import '../../index.css'

function LandingPageHeader() {
    return(
        <div className="header">
    
            <video poster="Photos/Website PosterImage.jpg" id="video-background" autoPlay muted loop>
                <source src = {video} type="video/mp4"/>
            </video>
        
            <div id="header-container">
                <div id="header-title">
                    <p>
                        Engaging Students with the Community <br/>
                        Welcome to Community ALI
                    </p>
                </div>
            
                <div id="header-subtitle">
                    <p>
                        A student social network to link your personal interests with MJC and more!
                    </p>
                </div>
            </div>
            
            <div id="header-button">
            <a id="button" href="/services"> Get Started </a>
            </div>
            
            <div className="curve-container">
                <svg className = "header-curve" id="curve" xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 1440 320"><path fill="#0096C9" id="scroll-to-here" fillOpacity="1" 
                d="M0,160L48,165.3C96,171,192,181,288,202.7C384,224,480,256,576,234.7C672,213,768,139,
                864,133.3C960,128,1056,192,1152,202.7C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,
                320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,
                320,288,320C192,320,96,320,48,320L0,320Z"></path></svg> 
            </div>
        </div>  
    )
}

export default LandingPageHeader;