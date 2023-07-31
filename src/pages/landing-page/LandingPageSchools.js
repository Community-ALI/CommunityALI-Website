import React, { Component } from 'react';
import '../../index.css'

function LandingPageSchools() {
    return(
        <div className="schools-container">
        
            <div className ="schools-container-title">
                Choose Your Subject and Career Path by Schools
            </div>

            <a className="schools-box" href="/services?filter=Agriculture" aria-label="School of Agriculture">
                <div className="icon"> 
                    <i className="fa-solid fa-cow fa-3x"> 
                        <hr className='icon-underline'></hr>
                    </i> 

                </div>

                <span className="icon-text"> School of Agriculture </span>
            </a>

            <a className="schools-box" href="/services?filter=Art,%20Performance%20%26%20The%20Humanities" aria-label="School of Arts, Performance, & the Humanities">
                <div className="icon"> 
                    <i className="fa-solid fa-masks-theater fa-3x"> 
                        <hr className='icon-underline'></hr>
                    </i> 
                </div>
                <span className="icon-text"> School of Arts, Performance, & the Humanities  </span>
            </a>

            <a className="schools-box" href="/services?filter=Behavioral%20%26%20Social%20Sciences" aria-label="School of Behavioral and Social Science">
                <div className="icon"> 
                    <i className="fa-solid fa-users fa-3x"> 
                        <hr className='icon-underline'></hr>
                    </i> 

                </div>
                <span className="icon-text"> School of Behavioral and Social Science </span>
            </a>

            <a className="schools-box" href="/services?filter=Business%20%26%20Computing" aria-label="School of Business and Computing">
                <div className="icon"> 
                    <i className="fa-solid fa-chart-line fa-3x"> 
                        <hr className='icon-underline'></hr>
                    </i> 

                </div>
                <span className="icon-text"> School of Business and Computing </span>
            </a>

            <a className="schools-box" href="/services?filter=Fitness%20%26%20Health%20Professions" aria-label="School of Fitness and Health Professions ">
                <div className="icon"> 
                    <i className="fa-solid fa-heart-pulse fa-3x"> 
                        <hr className='icon-underline'></hr>    
                    </i>
                   
                </div>
                <span className="icon-text"> School of Fitness and Health Professions </span>
            </a>

            <a className="schools-box" href="/services?filter=Industry%20%26%20Trades" aria-label="School of Industry and Trades">
                <div className="icon"> 
                    <i className="fa-solid fa-gears fa-3x"> 
                        <hr className='icon-underline'></hr>
                    </i> 
                </div>
                <span className="icon-text"> School of Industry and Trades </span>
            </a>

            <a className="schools-box" href="/services?filter=Language%20Arts%20%26%20Education" aria-label="School of Language Arts and Education">
                <div className="icon"> 
                    <i className="fa-solid fa-book fa-3x">
                        <hr className='icon-underline'></hr>
                    </i> 
                </div>
                <span className="icon-text"> School of Language Arts and Education </span>
            </a>

            <a className="schools-box" href="/services?filter=Public%20Safety" aria-label="School of Public Safety">
                <div className="icon"> 
                    <i className="fa-solid fa-house-chimney-medical fa-3x"> 
                        <hr className='icon-underline'></hr>
                    </i> 
                </div>
                <span className="icon-text"> School of Public Safety </span>
            </a>
            
            <a className="schools-box" href="/services?filter=Science,%20Engineering%20%26%20Mathematics" aria-label="School of Science and Mathematics">
                <div className="icon"> 
                    <i className="fa-solid fa-flask fa-3x">
                        <hr className='icon-underline'></hr>    
                    </i>    
                </div>
                <span className="icon-text"> School of Science and Mathematics </span>
            </a>

            <a className="schools-box" id="last-box" href="/services-clubs" aria-label="Search to Explore more Options">
                <div className="icon"> 
                    <i className="fa-solid fa-magnifying-glass fa-3x">
                        <hr className='icon-underline'></hr>  
                    </i> 
                </div>
                <span className="icon-text"> Search to Explore more Options </span>
            </a>
        </div>
    )
}

export default LandingPageSchools;