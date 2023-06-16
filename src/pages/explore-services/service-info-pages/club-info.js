import React, { useRef, useState, useEffect } from "react";
import NavBar from '../../../components/NavBar';
import '../../../components/navbar.css';
import '../service-info.css';
import ContactsPage from "./contacts-page";
import OverviewPage from "./overview-page";
import FaqPage from "./faq-page";
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
    "Contacts",
    "FAQ",
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
    <form method="POST" className="service-container" id='form'>
      <div className="service-title">
       Community ALI
      </div>

      <div className="service-navbar">
        {allCurrentPages.map((page) => (
          <div className="service-navbar-text" key={page} id={page === "OverviewPage" ? "" : `remove${page}`}>
            <a href="#" className="service-navbar-link" ref={pageRefs.current[page]} onClick={() => changeVisibility(page)}>{page}</a>
          </div>
        ))}
      </div>

      {activePage === "Overview" && <OverviewPage key="OverviewPage" />}
      {activePage === "Contacts" && <ContactsPage key="ContactsPage" />}
      {activePage === "FAQ" && <FaqPage key="FaqPage" />}
      {activePage === "Sign Up" && <SignUpPage key="SignUpPage"/>}

    </form>
  </div>
  )
}

export default AddClub;
