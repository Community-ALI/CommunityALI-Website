import React, { useState, Component } from 'react';
import '../../index.css'
import LazyLoad from 'react-lazy-load';

function LandingPageCommunityAliInformation() {

    const [videoLoaded, setVideoLoaded] = useState(false);

    const handleVideoClick = () => {
      setVideoLoaded(true);
    };

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
                {!videoLoaded && (
                    <div className="video-placeholder" onClick={handleVideoClick}>
                        <img src="photos-optimized/WebsiteVideoPlaceholder.jpg" className='description-video' />
                    </div>
                    )}
                    {videoLoaded && (
                    <LazyLoad offsetVertical={300}>
                        <iframe
                        className="description-video"
                        id="description-video-placeholder"
                        src="https://www.youtube.com/embed/CkaNT8QOt9U"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        />
                    </LazyLoad>
                    )}
                </div>
            </div>
        </div>
    )
}

export default LandingPageCommunityAliInformation;