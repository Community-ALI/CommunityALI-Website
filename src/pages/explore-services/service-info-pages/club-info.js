import React, { useRef, useState, useEffect } from "react";
import { Buffer } from 'buffer';
import {BASE_BACKEND_URL} from '../../../config.js'


import NavBar from '../../../components/NavBar';
import '../../../components/navbar.css';
import ContactsPage from "./contacts-page";
import SocialMediaPage from "./social-media-page";
import OverviewPage from "./overview-page";
import FaqPage from "./faq-page";
import RequirementsPage from "./requirements-page.js"
import SignUpPage from "./sign-up-page";
import '../../../pages/my-services/add-service.css';
import '../../../../public/stylesheets/style.css';



function AddClub() {
  const allPossiblePages = [
    "Overview",
    "Contacts",
    "Social Media",
    "FAQ",
    'Requirements',
    "Sign Up"
  ];

  const [allCurrentPages, setAllCurrentPages] = useState([
    "Overview",
    "Contacts",
    "Social Media",
    "FAQ",
    'Requirements',
    "Sign Up"
  ]);
  const [service, setService] = useState({})
  const [activePage, setActivePage] = useState("Overview");

  const pageRefs = useRef(allPossiblePages.reduce((refs, page) => {
    refs[page] = useRef(null);
    return refs;
  }, {}));

  const removePage = (pageToRemove) => {
    setAllCurrentPages((prevPages) => prevPages.filter((page) => page !== pageToRemove));
  };

  const changeVisibility = (page) => {
    setActivePage(page);
    Object.keys(pageRefs.current).forEach((key) => {
      const ref = pageRefs.current[key].current;
      if (!ref) return;
      ref.style.borderColor = key === page ? '#001E60' : 'white';
    });
  };

  useEffect(() => {
    changeVisibility("Overview"); // Set "Overview" as the active page initially
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);

      // Retrieve a specific parameter value
      const serviceName = urlParams.get('service');

      const response = await fetch(`${BASE_BACKEND_URL}/servicedata/get-one-service?service=` + serviceName)
        .then(response => response.json())
        .then(data => {
          // 'data' variable will contain the received service
          const buffer = Buffer.from(data.photo.data);
          const base64 = buffer.toString('base64');
          const imageUrl = `data:image/png;base64,${base64}`;
          data.photo = imageUrl;

          setService(data);
          if (!data.pages.contacts){
            removePage("Contacts")
          }
          if (!data.pages.FAQ){
            removePage("FAQ")
          }
          if (!data.pages.requirements){
            removePage("Requirements")
          }
          if (!data.pages.socialMedia){
            removePage("Social Media")
          }
          // show the page
          const loaderWrapper = document.querySelector(".loader-wrapper");
          loaderWrapper.style.transition = "opacity 0.5s";
          loaderWrapper.style.opacity = "0";
          setTimeout(() => {
            loaderWrapper.style.display = "none";
          }, 500); // fade out duration in milliseconds
          document.title = serviceName;
        })
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="loader-wrapper">
        <span className="loader"><span className="loader-inner"></span></span>
      </div>

      <NavBar isFixedPage={false} />
      <div className="service-container" id='form'>
        <div className="service-title">
        {service.title}
        </div>

        <div className="service-navbar">
          {allCurrentPages.map((page) => (
            <div className="service-navbar-text" key={page} id={page === "OverviewPage" ? "" : `remove${page}`}>
              <a href="#" className="service-navbar-link" ref={pageRefs.current[page]} onClick={() => changeVisibility(page)}>{page}</a>
            </div>
          ))}
        </div>

        {activePage === "Overview" && <OverviewPage key="OverviewPage" service={service} />}
        {activePage === "Contacts" && <ContactsPage key="ContactsPage" service={service} />}
        {activePage === "Social Media" && <SocialMediaPage key="SocialMediaPage" service={service} />}
        {activePage === "FAQ" && <FaqPage key="FaqPage" service={service} />}
        {activePage === "Requirements" && <RequirementsPage key="RequirementsPage" service={service} />}
        {activePage === "Sign Up" && <SignUpPage key="SignUpPage" service={service}/>}

      </div>
    </div>
  )
}

export default AddClub;
