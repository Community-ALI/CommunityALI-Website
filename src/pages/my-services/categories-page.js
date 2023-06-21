import React, { Component, useState, useEffect } from "react";
import './categories-page.css';
import '../../../public/stylesheets/style.css'
import NavBar from '../../components/NavBar';

function categoriesPage() {

    return(
        <div>
            <NavBar isFixedPage={false}/>
            <title> Service Categories </title>
            <div className="service-categories-container">
                <div className="category-container-title">
                    Select the Category of Your Service
                </div>
                <a className="category-container" href="/add-club">
                    <p className="category-header"> Add an MJC Club</p>
                    <p className="category-text"> 
                        Looking to bring more than just books and classes? Posting an MJC student club 
                        offers great ways to enrich a student's academic experience with new activities and 
                        friends. A club can focus on anything from careers, recreation, athletics and more!
                    </p>
                </a>

                <a className="category-container-unselectable" >
                {/* href="/add-event" */}
                    <p className="category-header">Add a Local Event</p>
                    <p className="category-text"> 
                        Bring more life to MJC by posting an event to enhance a student's college experience.
                        This involves both on-campus and off-campus events such as concerts, BBQs, conferences, 
                        political awareness booths, multi-cultural affairs, free films, and more!
                    </p>
                </a>

                <a className="category-container-unselectable" >
                {/* href="/add-volunteer" */}
                    <p className="category-header">Add Volunteering</p>
                    <p className="category-text"> 
                        Promote acts of civic engagement and community by posting a volunteer activity for
                        students to explore. This consists of a variety of projects such as campus beautification,
                        cleanups, food donations, fundraising, appreciation and more!
                    </p>
                </a>

                <a className="category-container-unselectable" >
                {/* href="/add-intern" */}
                    <p className="category-header">Add an Internship</p>
                    <p className="category-text"> 
                        Including both paid and unpaid internships, they are very valuable to students looking for
                        practical experience related to their career interest. This can involve any boot camps, virtual
                        internship, work research, college programs, and more!
                    </p>
                </a>
            </div>
        </div>
    );
}

export default categoriesPage;