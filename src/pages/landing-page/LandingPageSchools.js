import React, { Component } from 'react';
import '../../index.css'

function LandingPageSchools() {
    return(
        <div class="schools-container">
        
            <div class ="schools-container-title">
                Explore By Your Subject and Career Path
            </div>

            <a class="schools-box" href="" aria-label="School of Agriculture">
                <div class="icon"> <i class="fa-solid fa-cow fa-3x"> </i> </div>
                <span class="icon-text"> School of Agriculture </span>
            </a>

            <a class="schools-box" href="" aria-label="School of Arts, Performance, & the Humanities">
                <div class="icon"> <i class="fa-solid fa-masks-theater fa-3x"> </i> </div>
                <span class="icon-text"> School of Arts, Performance, & the Humanities  </span>
            </a>

            <a class="schools-box" href="" aria-label="School of Behavioral and Social Science">
                <div class="icon"> <i class="fa-solid fa-users fa-3x"> </i> </div>
                <span class="icon-text"> School of Behavioral and Social Science </span>
            </a>

            <a class="schools-box" href="" aria-label="School of Business and Computing">
                <div class="icon"> <i class="fa-solid fa-chart-line fa-3x"> </i> </div>
                <span class="icon-text"> School of Business and Computing </span>
            </a>

            <a class="schools-box" href="" aria-label="School of Fitness and Health Professions ">
                <div class="icon"> <i class="fa-solid fa-heart-pulse fa-3x"> </i> </div>
                <span class="icon-text"> School of Fitness and Health Professions </span>
            </a>

            <a class="schools-box" href="" aria-label="School of Industry and Trades">
                <div class="icon"> <i class="fa-solid fa-gears fa-3x"> </i> </div>
                <span class="icon-text"> School of Industry and Trades </span>
            </a>

            <a class="schools-box" href="" aria-label="School of Language Arts and Education">
                <div class="icon"> <i class="fa-solid fa-book fa-3x"> </i> </div>
                <span class="icon-text"> School of Language Arts and Education </span>
            </a>

            <a class="schools-box" href="" aria-label="School of Public Safety">
                <div class="icon"> <i class="fa-solid fa-house-chimney-medical fa-3x"> </i> </div>
                <span class="icon-text"> School of Public Safety </span>
            </a>
            
            <a class="schools-box" href="" aria-label="School of Science and Mathematics">
                <div class="icon"> <i class="fa-solid fa-flask fa-3x"></i> </div>
                <span class="icon-text"> School of Science and Mathematics </span>
            </a>

            <a class="schools-box" id="last-box" href="/services-clubs" aria-label="Search to Explore more Options">
                <div class="icon"> <i class="fa-solid fa-magnifying-glass fa-3x"></i> </div>
                <span class="icon-text"> Search to Explore more Options </span>
            </a>
        </div>
    )
}

export default LandingPageSchools;