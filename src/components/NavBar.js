import React, { useRef, Component, useEffect, useState } from "react";
import { BASE_BACKEND_URL } from "../config.js";
import { Link } from "react-router-dom";
import "./navbar.css";
import "../../public/stylesheets/style.css";
import LoginButton from "./LoginButton";
import LoginPopup from "./LoginPopup";
import Notifications from "./Notification";
import SignupPopup from "./SignupPopup";
import SignUpButton from "./SignUpButton.js";

function MyServicesNavButton(props) {
  var token = localStorage.getItem("token");
  var decodedToken = {};
  if (token) {
    decodedToken = JSON.parse(atob(token.split(".")[1]));
    console.log(decodedToken);
  }
  const [notifications, setNotifications] = useState([]);

  function fetchNotificationData() {
    const fetchData = async () => {
      try {
        var token = localStorage.getItem("token");
        if (token) {
          const response = await fetch(
            `${BASE_BACKEND_URL}/userdata/get-all-user-notifications`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
            .then((response) => response.json())
            .then((data) => {
              setNotifications(data.notifications);
            });
        } else {
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }

  if (decodedToken.administrator) {
    return (
      <Link
        className="navigation-button navigation-text relative-container"
        to="/administrator-my-service-selection"
        id="applicants"
      >
        <Notifications
          notifications={notifications ? notifications.length : 0}
        />
        Admin
      </Link>
    );
  } else if (decodedToken.hasManagementPrivileges) {
    return (
      <Link
        className="navigation-button navigation-text relative-container"
        to="/my-services"
        id="applicants"
      >
        <Notifications
          notifications={notifications ? notifications.length : 0}
        />
        Manage
      </Link>
    );
  }

  if (decodedToken.administrator) {
    return (
      <Link
        className="navigation-button navigation-text relative-container"
        to="/administrator-my-service-selection"
        id="applicants"
      >
        <Notifications
          notifications={notifications ? notifications.length : 0}
        />
        Manage
      </Link>
    );
  } else if (decodedToken.hasManagementPrivileges) {
    return (
      <Link
        className="navigation-button navigation-text relative-container"
        to="/my-services"
        id="applicants"
      >
        <Notifications
          notifications={notifications ? notifications.length : 0}
        />
        Manage
      </Link>
    );
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
  const navigationMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = (event) => {
      if (props.isFixedPage) {
        // prevent it from looking different if the bar is fixed
        setHasScrolled(window.scrollY > 0 ? true : false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (
        navigationMenuRef.current &&
        !navigationMenuRef.current.contains(event.target) &&
        event.target.className !== "navigation-menu" &&
        event.target !== searchRef.current
      ) {
        setShowNavBarMobile(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  useState(() => {
    window.addEventListener("resize", () => {
      setIsMobile(window.innerWidth <= 850);
    });
  });

  // get token from local storage
  useEffect(() => {
    var token = localStorage.getItem("token");
    // if the token is older than its max age, remove it
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      if (!decodedToken.expires || decodedToken.expires < Date.now() / 1000) {
        // if the token is expired, request a new one
        fetch(`${BASE_BACKEND_URL}/user/refresh-token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: token }),
        })

          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              localStorage.setItem("token", data.token);
              token = data.token;
              localStorage.setItem("token", data.token);
              console.log("token refreshed");
            } else {
              localStorage.removeItem("token");
            }
          }
        );
      }
    }
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
      if (event.key === "Enter") {
        // Prevent the form from submitting
        event.preventDefault();

        // Perform search logic here
        const searchText = searchRef.current.value.trim().split(" ").join("+");
        const url = "/services?keyword=" + searchText;
        window.location.href = url;
      }
    };

    // Attach Event Listener to Search Bar
    searchRef.current.addEventListener("keyup", handleSearch);
    const queryParams = new URLSearchParams(window.location.search);
    const keyword = queryParams.get("keyword");
    if (keyword) {
      searchRef.current.value = keyword;
    }
    // Clean up the event listener
    return () => {
      if (searchRef.current) {
        searchRef.current.removeEventListener("keyup", handleSearch);
      }
    };
  }, [isMobile]);

  // explore link only redirects if not already on explore page
  const navigateExplore = (event) => {
    event.preventDefault();
    console.log(window.location.href);
    // if the path does not contain /services, redirect to /services
    if (!window.location.href.includes("/services")) {
      window.location.href = "/services";
    }
  };

  return (
    <>
      <div
        className={
          "navigation-bar" +
          (props.isFixedPage ? "" : " navigation-bar-not-fixed") +
          (showNavBarMobile ? " active" : "") +
          (props.hideMobileSearchBar ? " top-4" : "") +
          (hasScrolled ? " navigation-bar-scrolled" : "")
        }
      >
        <nav className={"navigation-menu"}>
          <a href="/">
            <img
              src="/photos-optimized/TeamLogo-opt.png"
              alt="ALI logo"
              className="navbar-logo"
            />
          </a>

          {(!isMobile || props.hideMobileSearchBar) && (
            <div
              className={
                "flex-grow border-2 border-white rounded-2xl p-2 px-4 mr-0 text-base text-white relative" +
                (props.hideMobileSearchBar
                  ? " h-[40px] bg-transparent w-[220px] xsm:w-[200px] transition-all mr-0 mb-[40px] md:text-[12px]"
                  : "")
              }
            >
              <input
                id="navigation-search-bar-input"
                placeholder="Search..."
                ref={searchRef}
              />
              <img
                src="/Photos/search.png"
                alt="Search icon"
                id="navigation-search-bar-icon"
              />
            </div>
          )}

          <a className="navigation-text" href="/">
            Home
          </a>

          <a className="navigation-text" onClick={navigateExplore}>
            Explore
          </a>

          <MyServicesNavButton
            token={token}
            constantUpdate={props.constantUpdate}
          />

          <a
            className="navigation-text"
            href="https://www.mjc.edu/"
            target="_blank"
          >
            MJC
          </a>

          {isMobile && window.innerWidth <= 850 ? null : (
            <LoginButton ShowLoginPopup={showLoginPopup} token={token} />
          )}

          <SignUpButton
            ShowSignupPopup={showSignupPopup}
            token={token}
          ></SignUpButton>
        </nav>
      </div>

      {isMobile && !props.hideMobileSearchBar && (
        <div
          className="h-[40px] z-10 bg-transparent w-[90%] top-[80px] left-[5%] transition-all 
          flex-grow border-2 border-white rounded-2xl p-2 px-4 mr-3 text-base text-white relative"
        >
          <input
            id="navigation-search-bar-input"
            placeholder="Search..."
            ref={searchRef}
          />
          <img
            src="Photos/search.png"
            alt="Photos/NoPhoto.webp"
            id="navigation-search-bar-icon"
          />
        </div>
      )}

      <div
        className={"navigation-hamburger" + (showNavBarMobile ? " active" : "")}
      >
        <div
          className="mr-[12px]"
          onClick={() => setShowNavBarMobile(!showNavBarMobile)}
          ref={navigationMenuRef}
        >
          <div className="navigation-line"></div>
          <div className="navigation-line"></div>
          <div className="navigation-line"></div>
        </div>

        <a href="/">
          <img
            src="photos-optimized/TeamLogo-opt.png"
            alt="Photos/NoPhoto.webp"
            className="navbar-logo mobileLogo"
          />
        </a>

        <div>
          <LoginButton ShowLoginPopup={showLoginPopup} token={token} />
        </div>
      </div>

      <LoginPopup
        isShowingLoginPopup={isShowingLoginPopup}
        showSignupPopup={showSignupPopup}
      />
      <SignupPopup
        isShowingSignupPopup={isShowingSignupPopup}
        showLoginPopup={showLoginPopup}
        SetIsShowingSignupPopupFalse={() => {
          setIsShowingSignupPopup(!isShowingSignupPopup);
        }}
      />

      <div
        id="login-popup-background"
        className={isShowingLoginPopup || isShowingSignupPopup ? "" : "hidden"}
        onClick={hidePopups}
        style={{ cursor: "pointer" }}
      ></div>
    </>
  );
}

export default NavBar;
