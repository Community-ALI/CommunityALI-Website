import React, { Component } from 'react';
import '../../index.css'

function LandingPageCatagories() {
    return(
        <div className="main-container">
            <div className ="container-title">
                <p> Explore a Variety Of Opportunities From These Categories</p>
            </div>
            
            <div className="categories-container">
                <a className = "category-box" id="box1" href="explore-services/main-page">
                    <div className = "box">
                        <div className="category-image">
                            <img id="career" src="photos-optimized/career-opt.jpg"/>
                        </div>
                        <div id="career-text" className="box-header-text">Subject and Career Path</div>
                    </div>
                </a>
                <a className="category-box" id="box2" href="explore-services/main-page">
                    <div className = "box">
                        <img id="club" src="photos-optimized/clubs-opt.jpg"/>
                        <div id="club-text" className="box-header-text"> Clubs and Communities</div>
                    </div>
                </a>  
                <div className="category-box" id="box3" href="">
                    <div className = "box">
                        <img id="volunteer" src="photos-optimized/volunteer-opt.jpg"/>
                        <div className="preview-text"> COMING SOON</div>
                        <div id="volunteer-text" className="box-header-text"> Volunteer & Community Service</div>
                    </div>
                </div>  
                <div className="category-box" id="box4" href="">
                    <div className = "box">
                        <img id="internship" src="photos-optimized/internship-opt.jpg"/>
                        <div className="preview-text"> COMING SOON</div>
                        <div id="volunteer-text" className="box-header-text"> Internships & Work Experience</div>
                    </div>
                </div>  
            </div>
        </div>
    )
}

export default LandingPageCatagories;