import React, { useRef, useState, useEffect } from "react";
import NavBar from '../../../components/NavBar';
import '../../../components/navbar.css';
import '../service-info.css';
import ContactsPage from "./contacts-page";
import OverviewPage from "./overview-page";
// import FaqPage from "../general-components/faq-page";
import SignUpPage from "./sign-up-page";
import '../../../pages/my-services/add-service.css';
import '../../../../public/stylesheets/style.css';

function AddClub() {
  const allPossiblePages = [
    "Overview",
    "Contacts",
    "FAQ",
    "Sign Up"
  ];

  const [allCurrentPages, setAllCurrentPages] = useState([
    "Overview",
    "Sign Up"
  ]);

  const [activePage, setActivePage] = useState("Overview");

  const pageRefs = useRef(allPossiblePages.reduce((refs, page) => {
    refs[page] = useRef(null);
    return refs;
  }, {}));

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

  return (
    <div>
      <NavBar isFixedPage={false} />
      <div className="py-32">
        <div className="service-title">
          <h1 className="club-title-text-box" >Name of the Club</h1>
          <br />
        </div>

        <div className="service-navbar">
          {allCurrentPages.map((page) => (
            <div className="service-navbar-text" key={page} id={page === "OverviewPage" ? "" : `remove${page}`}>
              <a href="#" className="service-navbar-link" ref={pageRefs.current[page]} onClick={() => changeVisibility(page)}>{page}</a>
            </div>
          ))}

          <div
            className="service-navbar-plus-container"
            tabIndex="0"
          >
          </div>
        </div>

        {activePage === "Overview" && <OverviewPage key="OverviewPage" />}
        {activePage === "Contacts" && <ContactsPage key="ContactsPage" />}
        {activePage === "FAQ" && <FaqPage key="FaqPage" />}
        {activePage === "Sign Up" && <SignUpPage key="SignUpPage" />}
      </div>
    </div>
  );
}

export default AddClub;
