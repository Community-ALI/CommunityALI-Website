import React, { Component } from 'react';
import '../../index.css'

function LandingPageTutoring() {
    return(
        <div className="landing-page-container" id='tutoring-container'>
        
            <div className ="landing-page-container-title" id='landing-page-schools-header-title'>
                Visit MJC's Services to Enrich Your College Experience
            </div>

            <div id="landing-page-categories">
                <a className="landing-page-category-box" href="/services-clubs" aria-label="Clubs and Campus Life">
                    <img src="photos-optimized/clubs-opt.webp" alt='Photos/NoCategoryImg.webp'/>
                    <div className="landing-page-category-title-top"> Clubs and Campus Life </div>
                </a>  
                <a className="landing-page-category-box" href="/services-clubs" aria-label="Programs and Resources">
                    <img src="photos-optimized/student-opt.webp" alt='Photos/NoCategoryImg.webp'/>
                    <div className="landing-page-category-title-top"> Programs and Resources</div>
                </a>  
                <div className="landing-page-category-box" id="box3">
                    <img src="photos-optimized/volunteer-opt.webp" alt='Photos/NoCategoryImg.webp'/>
                    <div className="landing-page-category-coming-soon"> COMING SOON </div>
                    <div className="landing-page-category-title-bottom"> Volunteer & Community Service </div>
                </div>  
                <div className="landing-page-category-box" id="box4">
                    <img src="photos-optimized/internship-opt.webp" alt='Photos/NoCategoryImg.webp'/>
                    <div className="landing-page-category-coming-soon"> COMING SOON </div>
                    <div className="landing-page-category-title-bottom"> Internships & Work Experience </div>
                </div>  
            </div>

        </div>
    )
}

export default LandingPageTutoring;