import React, { Component } from 'react';
import '../../index.css'

function LandingPageSchools() {
    return(
        <div className="landing-page-container" id='schools-container'>
        
            <div className ="landing-page-container-title" id='landing-page-schools-header-title'>
                Choose Your Subject and Career Path by Schools
            </div>

            <a className="landing-page-school-box" href="/services?filter=Agriculture" aria-label="School of Agriculture">
                <i className="fa-solid fa-cow fa-3x"> 
                    <hr className='landing-page-school-underline'></hr>
                </i> 
                <span className="landing-page-school-title "> School of Agriculture </span>
            </a>

            <a className="landing-page-school-box" href="/services?filter=Art,%20Performance%20%26%20The%20Humanities" aria-label="School of Arts, Performance, & the Humanities">
                <i className="fa-solid fa-masks-theater fa-3x"> 
                    <hr className='landing-page-school-underline'></hr>
                </i> 
                <span className="landing-page-school-title"> School of Arts, Performance, & the Humanities  </span>
            </a>

            <a className="landing-page-school-box" href="/services?filter=Behavioral%20%26%20Social%20Sciences" aria-label="School of Behavioral and Social Science">
                <i className="fa-solid fa-users fa-3x"> 
                    <hr className='landing-page-school-underline'></hr>
                </i> 
                <span className="landing-page-school-title "> School of Behavioral and Social Science </span>
            </a>

            <a className="landing-page-school-box" href="/services?filter=Business%20%26%20Computing" aria-label="School of Business and Computing">
                <i className="fa-solid fa-chart-line fa-3x"> 
                    <hr className='landing-page-school-underline'></hr>
                </i> 
                <span className="landing-page-school-title "> School of Business and Computing </span>
            </a>

            <a className="landing-page-school-box" href="/services?filter=Fitness%20%26%20Health%20Professions" aria-label="School of Fitness and Health Professions ">
                <i className="fa-solid fa-heart-pulse fa-3x"> 
                    <hr className='landing-page-school-underline'></hr>    
                </i>
                <span className="landing-page-school-title "> School of Fitness and Health Professions </span>
            </a>

            <a className="landing-page-school-box" href="/services?filter=Industry%20%26%20Trades" aria-label="School of Industry and Trades">
                <i className="fa-solid fa-gears fa-3x"> 
                    <hr className='landing-page-school-underline'></hr>
                </i> 
                <span className="landing-page-school-title "> School of Industry and Trades </span>
            </a>

            <a className="landing-page-school-box" href="/services?filter=Language%20Arts%20%26%20Education" aria-label="School of Language Arts and Education">
                <i className="fa-solid fa-book fa-3x">
                    <hr className='landing-page-school-underline'></hr>
                </i> 
                <span className="landing-page-school-title "> School of Language Arts and Education </span>
            </a>

            <a className="landing-page-school-box" href="/services?filter=Public%20Safety" aria-label="School of Public Safety">
                <i className="fa-solid fa-house-chimney-medical fa-3x"> 
                    <hr className='landing-page-school-underline'></hr>
                </i> 
                <span className="landing-page-school-title "> School of Public Safety </span>
            </a>
            
            <a className="landing-page-school-box" href="/services?filter=Science,%20Engineering%20%26%20Mathematics" aria-label="School of Science and Mathematics">
                <i className="fa-solid fa-flask fa-3x">
                    <hr className='landing-page-school-underline'></hr>    
                </i>    
                <span className="landing-page-school-title "> School of Science and Mathematics </span>
            </a>

            <a className="landing-page-school-box" id="school-last-box" href="/services-clubs" aria-label="Search to Explore more Options">
                <i className="fa-solid fa-magnifying-glass fa-3x">
                    <hr className='landing-page-school-underline'></hr>  
                </i> 
                <span className="landing-page-school-title "> Search to Explore more Options </span>
            </a>

        </div>
    )
}

export default LandingPageSchools;