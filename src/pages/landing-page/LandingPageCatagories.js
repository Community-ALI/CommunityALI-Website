import React, { Component } from 'react';
import '../../index.css'

function LandingPageCatagories() {
    return(
        <div className="main-container">
            <div className ="container-title">
                <p> Explore a Variety Of Opportunities From These Categories</p>
            </div>
            
            <div className="categories-container">
                {/* <a className = "category-box" id="box1" href="/services" aria-label="Subject and Career Path">
                    <div className = "box">
                        <div className="category-image"> 
                            <img id="career" src="photos-optimized/career-opt.webp" alt='Photos/NoCategoryImg.webp'/>
                        </div>
                        <div id="career-text" className="box-header-text">Subject and Career Path</div>
                    </div>
                </a> */}
                <a className="category-box" id="box1" href="/services-clubs" aria-label="Clubs and Communities">
                    <div className = "box">
                        <img id="club" src="photos-optimized/clubs-opt.webp" alt='Photos/NoCategoryImg.webp'/>
                        <div id="club-text" className="box-header-text"> Clubs and Communities</div>
                    </div>
                </a>  
                <a className="category-box" id="box2" href="/services-clubs" aria-label="Events and Campus Life">
                    <div className = "box">
                        <img id="events" src="photos-optimized/events-opt.webp" alt='Photos/NoCategoryImg.webp'/>
                        <div id="club-text" className="box-header-text"> Events and Campus Life</div>
                    </div>
                </a>  
                <div className="category-box" id="box3" href="">
                    <div className = "box">
                        <img id="volunteer" src="photos-optimized/volunteer-opt.webp" alt='Photos/NoCategoryImg.webp'/>
                        <div className="preview-text"> COMING SOON</div>
                        <div id="volunteer-text" className="box-header-text"> Volunteer & Community Service</div>
                    </div>
                </div>  
                <div className="category-box" id="box4" href="">
                    <div className = "box">
                        <img id="internship" src="photos-optimized/internship-opt.webp" alt='Photos/NoCategoryImg.webp'/>
                        <div className="preview-text"> COMING SOON</div>
                        <div id="volunteer-text" className="box-header-text"> Internships & Work Experience</div>
                    </div>
                </div>  
            </div>
        </div>
    )
}

export default LandingPageCatagories;