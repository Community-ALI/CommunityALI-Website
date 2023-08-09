import React, { Component } from 'react';
import '../../index.css'

function LandingPagePartners() {
    return(
        <div className="landing-page-container" id='partners-container'>  
            <div className ="landing-page-container-title">
                <p>
                    Thank you to our Sponsors and Partners for your Support
                </p>
            </div>
    
            <div className="landing-page-partners-images">
                <a className="landing-page-partner-link" 
                    href="https://www.fourthworldcooperative.org/" 
                    target="_blank"
                    aria-label="Fourth World">
                    <img id="fourth-world-image" src="photos-optimized/fourthworld-opt.webp"
                    alt="Photos/NoPhoto.webp"/>
                </a>
                <a className="landing-page-partner-link" 
                    href="https://solvecc.org/" 
                    target="_blank"
                    aria-label="SolveCC">
                    <img id="solvecc-image" src="photos-optimized/solvecc-opt.webp"
                    alt='Photos/NoPhoto.webp'/>
                </a>
            </div>
        </div>
    )
}

export default LandingPagePartners;