import React, { Component } from 'react';
import '../../index.css'

function LandingPageCommunityAliInformation() {
    return(
        <div className="description-container">  
            <div className ="container-title">
                <p>
                What Inspired Us to Create Community ALI?
                </p>
            </div>
    
            <div className="text-video-container">
                <div className="description-text">
                    <p>
                    We strive to grant every student with the opportunity to connect with their campus and local community. Whether
                    it's for academic growth, career growth, or personal growth, this platform is made to accessibly reach your interests 
                    and beyond. We're committed to providing the most efficient methods and features because we've struggled to make the most of our 
                    educational journey. 
                    </p>
                </div>
        
                <div>
                    <iframe 
                        className="description-video" 
                        src="https://www.youtube.com/embed/CkaNT8QOt9U" 
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowFullScreen> 
                    </iframe>
                </div>
            </div>
        </div>
    )
}

export default LandingPageCommunityAliInformation;