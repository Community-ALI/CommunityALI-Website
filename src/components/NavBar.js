import React, { useRef, Component, useEffect, useState } from 'react';
import { BASE_BACKEND_URL } from '../config.js'
import { Link } from 'react-router-dom';
import './navbar.css';
import '../../public/stylesheets/style.css'
import LoginButton from './LoginButton';
import LoginPopup from './LoginPopup';
import Notifications from './Notification';
import SignupPopup from './SignupPopup';
import SignUpButton from './SignUpButton.js';

function MyServicesNavButton(props) {
    var token = localStorage.getItem('token');
    var decodedToken = {};
    if (token) {
        decodedToken = JSON.parse(atob(token.split('.')[1]));
    }
    const [notifications, setNotifications] = useState([]);

    function fetchNotificationData() {
        const fetchData = async () => {
            try {
                var token = localStorage.getItem('token');
                if (token) {
                    const response = await fetch(`${BASE_BACKEND_URL}/userdata/get-all-user-notifications`,
                        {
                            headers:
                            {
                                'Authorization': `Bearer ${token}`
                            }
                        })
                        .then(response => response.json())
                        .then(data => {
                            setNotifications(data.notifications);
                        })
                }
                else {

                }
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    };

    if (props.constantUpdate)
        useEffect(() => {
            fetchNotificationData();
        });
    else
        useEffect(() => {
            fetchNotificationData();
        }, []);

    if (decodedToken.administrator) {
        return (
            <Link
                className="navigation-button navigation-text relative-container"
                to="/administrator-my-service-selection"
                id="applicants"
            >
                <Notifications notifications={notifications ? notifications.length : 0} />
                Manage
            </Link>
            )
    }
    else if (decodedToken.clubAdmin || decodedToken.eventAdmin || decodedToken.volunteerAdmin || decodedToken.internshipAdmin) {
        return (
            <Link
                className="navigation-button navigation-text relative-container"
                to="/my-services"
                id="applicants"
            >
                <Notifications notifications={notifications ? notifications.length : 0} />
                Manage
            </Link>
        )
    }

    return null;
}

function NavBar(props) {
    const [isShowingLoginPopup, setIsShowingLoginPopup] = useState(false);
    const [isShowingSignupPopup, setIsShowingSignupPopup] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);
    const [token, setToken] = useState(false);
    const [showNavBarMobile, setShowNavBarMobile] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 850);

    useEffect(() => {
        const handleScroll = event => {
            if (props.isFixedPage) { // prevent it from looking different if the bar is fixed
                setHasScrolled(window.scrollY > 0 ? true : false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    })

    useState(() => {
        window.addEventListener('resize', (() => {
            setIsMobile(window.innerWidth <= 850)
        }));
    })

    // get token from local storage
    useEffect(() => {
        const token = localStorage.getItem('token');
        setToken(token);
    }, [setToken]);

    function showLoginPopup() {
        setIsShowingLoginPopup(true);
        setIsShowingSignupPopup(false);
    }

    function showSignupPopup() {
        setIsShowingSignupPopup(true);
        setIsShowingLoginPopup(false);
    }

    function hidePopups() {
        setIsShowingLoginPopup(false);
        setIsShowingSignupPopup(false);
    }

    const searchRef = useRef(null);

    // Search Bar Event Listener
    useEffect(() => {
        const handleSearch = (event) => {
            if (event.key === 'Enter') {
                // Prevent the form from submitting
                event.preventDefault();

                // Perform search logic here
                const searchText = searchRef.current.value.trim().split(' ').join('+');
                const url = "/services?keyword=" + searchText;
                window.location.href = url;
            }
        };

        // Attach Event Listener to Search Bar
        searchRef.current.addEventListener('keyup', handleSearch);
        const queryParams = new URLSearchParams(window.location.search);
        const keyword = queryParams.get('keyword');
        if (keyword) {
            searchRef.current.value = keyword;
        }
        // Clean up the event listener
        return () => {
            if (searchRef.current) {
                searchRef.current.removeEventListener('keyup', handleSearch);
            }
        };
    }, [isMobile]);

    return (
        <>
            <div className={"navigation-bar" + (props.isFixedPage ? '' : " navigation-bar-not-fixed") + (showNavBarMobile ? " active" : "")} >
                <nav className={"navigation-menu" + (hasScrolled ? ' navigation-bar-scrolled' : '')} >
                    <a href="/">
                        <img src="photos-optimized/TeamLogo-opt.png" alt='Photos/NoPhoto.webp' className="navbar-logo" />
                    </a>

                    {!isMobile &&
                        <div id="navigation-search-bar">
                            <input
                                id='navigation-search-bar-input'
                                placeholder="Search..."
                                ref={searchRef}
                            />
                            <img src="Photos/search.png" alt='Photos/NoPhoto.webp' id="navigation-search-bar-icon" />
                        </div>
                    }

                    <a className="navigation-text" href="/">
                        Home
                    </a>

                    <Link className="navigation-text" to="/services">
                        Explore
                    </Link>

                    <MyServicesNavButton token={token} constantUpdate={props.constantUpdate} />

                    <a className="navigation-text" href="https://www.mjc.edu/" target="_blank">
                        MJC
                    </a>

                    <LoginButton ShowLoginPopup={showLoginPopup} token={token} />
                    <SignUpButton ShowSignupPopup={showSignupPopup} token={token}></SignUpButton>
                </nav>
            </div>

            {isMobile &&
                <div id="navigation-search-bar">
                    <input
                        id='navigation-search-bar-input'
                        placeholder="Search..."
                        ref={searchRef}
                    />
                    <img src="Photos/search.png" alt='Photos/NoPhoto.webp' id="navigation-search-bar-icon" />
                </div>
            }

            <div
                className={"navigation-hamburger" + (showNavBarMobile ? " active" : "")}
                onClick={() => setShowNavBarMobile(!showNavBarMobile)}
            >
                <div>
                    <div className="navigation-line"></div>
                    <div className="navigation-line"></div>
                    <div className="navigation-line"></div>
                </div>

                <div id="navigation-logo-container">
                    <a href="/">
                        <img src="photos-optimized/TeamLogo-opt.png" alt='Photos/NoPhoto.webp' className="navbar-logo mobileLogo" />
                    </a>
                </div>
            </div>

            <LoginPopup isShowingLoginPopup={isShowingLoginPopup} showSignupPopup={showSignupPopup} />
            <SignupPopup isShowingSignupPopup={isShowingSignupPopup} showLoginPopup={showLoginPopup} />

            <div
                id='login-popup-background'
                className={isShowingLoginPopup || isShowingSignupPopup ? '' : 'hidden'}
                onClick={hidePopups}
                style={{ cursor: 'pointer' }}
            >
            </div>
        </>
    )
}

export default NavBar;