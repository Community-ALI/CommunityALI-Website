import React, { Component, useState, useEffect } from 'react';
import video from '../../../public/videos//Webvideo-opt.mp4'
import mobileVideo from '../../../public/videos//Webvideo-optMAX.mp4'
import '../../index.css'

function LandingPageHeader() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => 
    {
        // Check the screen width on initial load and when the window is resized
        const handleScreenSizeChange = () => 
        {
          setIsMobile(window.innerWidth <= 500);
        };
    
        handleScreenSizeChange();
        window.addEventListener('resize', handleScreenSizeChange);
    
        return () => 
        {
          window.removeEventListener('resize', handleScreenSizeChange);
        };
      }, []);
    
    return(
        <div className="header">
    
        <video
            className="object-cover min-w-[100vw] absolute z-[-1] min-h-full"
            autoPlay
            muted
            loop
            preload="metadata"
        >
            {/* Conditionally render the video source based on screen width */}
            <source src={isMobile ? `${mobileVideo}#t=0.1` : `${video}#t=0.1`} type="video/mp4" />
        </video>
        
            <div id="header-container">
                <div id="header-title">
                    <p>
                        Engaging MJC Students with the World <br/>
                        Welcome to Community ALI
                    </p>
                </div>
            
                <div id="header-subtitle">
                    <p>
                        A student platform to link your personal interests with Modesto Junior College
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