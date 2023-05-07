import React, { Component, useEffect, useState } from 'react';
import './navbar.css';
import LoginButton from './LoginButton';

function NavBar(props) {
    const [isShowingLoginPopup, setIsShowingLoginPopup] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);
    const [token, setToken] = useState(false);
    
    useEffect(() => {
        const handleScroll = event => {
            setHasScrolled(window.scrollY > 0 ? true : false);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    })

    useEffect(() => {
        setToken(localStorage.getItem('token'));
    });

    return(
        <div 
            className={"navigation-bar" + (props.isFixedPage ? '' : " not-fixed")}
        >
            <nav 
                className={"navigation-menu" + (hasScrolled ? ' scrolled' : '')}
            >
                <a href="index.html">
                    <img src="Photos/CClogo.png" className="navbar-logo"/>
                </a>
                <input 
                    placeholder="Search..." 
                    id="nav-menu-search-bar"
                />
                <a 
                    className="navigation-button navigation-text" 
                    href="index.html">
                Home</a>
                <a 
                    className="navigation-button navigation-text" 
                    href="service-search"
                >Explore</a>
                <a 
                    className="navigation-button navigation-text" 
                    href="my-services.html" 
                    id="applicants"
                >My Services</a>
                <a 
                    className="navigation-button navigation-text" 
                    href="https://www.mjc.edu/" 
                    target="_blank"
                >MJC</a>
                <LoginButton 
                    SetIsSHowingLoginPopup={setIsShowingLoginPopup}
                    token={token}
                />
            </nav>
            <div 
                className="navigation-sub-menu navigation-menu"
            >
                <a 
                    className="navigation-button navigation-text" 
                    href="service-search"
                >Subject and Career Path</a>
                <a 
                    className="navigation-button navigation-text" 
                    href="service-search"
                >Clubs and Communities</a>
                <a 
                    className="coming-soon navigation-button navigation-text"
                >Volunteer &amp; Community Service</a>
                <a 
                    className="coming-soon navigation-button navigation-text"
                >Internship &amp; Work Experience</a>
            </div>
        </div>
    )
}

export default NavBar;