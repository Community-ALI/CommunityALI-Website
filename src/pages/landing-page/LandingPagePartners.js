import React, { Component } from 'react';
import '../../index.css'

function LandingPagePartners() {
    return(
        <div className="partners-container">  
            <div className ="container-title">
                <p>
                    Thank you to our Sponsors and Partners for your Support
                </p>
            </div>
    
            <div className="partners-images-container">
                <a className="partner-link" href="https://www.fourthworldcooperative.org/" 
                target="_blank"
                aria-label="Fourth World">
                    <img id="fourth-world" src="photos-optimized/fourthworld-opt.webp"
                    alt="Photos/NoPhoto.webp"/>
                </a>
                <a className="partner-link" href="https://solvecc.org/" 
                target="_blank"
                aria-label="SolveCC">
                    <img id="solvecc" src="photos-optimized/solvecc-opt.webp"
                    alt='Photos/NoPhoto.webp'/>
                </a>
            </div>
        </div>
    )
}

export default LandingPagePartners;