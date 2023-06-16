import React, { useRef, useState, useEffect } from "react";
import NavBar from '../../../components/NavBar';
import '../../../components/navbar.css';
import '../add-service.css';
import ContactsPage from "./contacts-page";
import OverviewPage from "./overview-page";
import FaqPage from "../general-components/faq-page";
import SignUpPage from "./sign-up-page";
import { Buffer } from 'buffer';

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

  const removablePages = ["Contacts", "FAQ"];

  const [showAddButtons, setShowAddButtons] = useState(false);

  const [activePage, setActivePage] = useState("Overview");

  const [overviewFormData, setOverviewFormData] = useState({});
  const [contactsFormData, setContactsFormData] = useState({});
  const [faqFormData, setFaqFormData] = useState({});

  const pageRefs = useRef(allPossiblePages.reduce((refs, page) => {
    refs[page] = useRef(null);
    return refs;
  }, {}));

  const titleRef = useRef(null);
  const [titleValue, setTitleValue] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      
      // Retrieve a specific parameter value
      const serviceName = urlParams.get('service');
          
      const response = await fetch('http://localhost:3000/get-one-service?service='+serviceName)
          .then(response => response.json())
          .then(data => {
              // 'data' variable will contain the received service
              const buffer = Buffer.from(data.photo.data);
              const base64 = buffer.toString('base64');
              const imageUrl = `data:image/png;base64,${base64}`;

              // overview
              setOverviewFormData(data.pages.overview); 

              // Contacts
              if (data.pages.contacts){
                addPage('Contacts');
                setContactsFormData(data.pages.contacts);
              }
              if (data.pages.FAQ){
                addPage('FAQ');
                setFaqFormData(data.pages.FAQ);
              }
              // show the page
              const loaderWrapper = document.querySelector(".loader-wrapper");
              loaderWrapper.style.transition = "opacity 0.5s";
              loaderWrapper.style.opacity = "0";
              setTimeout(() => {
                  loaderWrapper.style.display = "none";
              }, 500); // fade out duration in milliseconds
          })
    };
    fetchData();
  }, []);
  
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

  const deletePage = (pageToRemove) => {
    if (removablePages.includes(pageToRemove)) {
      if (activePage === pageToRemove) {
        changeVisibility("Overview");
      }
      if (pageToRemove === 'Contacts') {
        setContactsFormData({})
      }
      if (pageToRemove === 'FAQ') {
        setFaqFormData({})
      }
      const newArray = allCurrentPages.filter((page) => page !== pageToRemove);
      setAllCurrentPages(newArray);
    }
  };

  const addPage = (pageToAdd) => {
    setAllCurrentPages((prevPages) => {
      const insertIndex = prevPages.findIndex(
        (page) => allPossiblePages.indexOf(page) > allPossiblePages.indexOf(pageToAdd)
      );
      if (insertIndex === -1) {
        return [...prevPages, pageToAdd];
      }
      if (pageToAdd === 'Contacts') {
        if (contactsFormData === {}){
          setContactsFormData({
            "contacts": [{ "contactRole": "", "contactName": "", "contactEmail": "" }],
            "socialMedia": [{ "mediaType": "", "mediaName": "", "mediaUrl": "" }]
          })
        }
      }
      else if (pageToAdd === 'FAQ') {
        if (faqFormData === {}){
          setFaqFormData({ "faq": [{ "faqQuestion": "", "faqAnswer": "" }] })
        }
        
      }
      const updatedPages = [...prevPages];
      updatedPages.splice(insertIndex, 0, pageToAdd);
      return updatedPages;
    });
  };
  // these three are 
  function disapear() {
    setShowAddButtons(false);
  }

  function hide() {
    setTimeout(disapear, 250);
  }

  const toggleAddButtons = () => {
    setShowAddButtons((prevState) => !prevState)
  };

  return (
    <div>
      <NavBar isFixedPage={false} />
      <form method="POST" className="service-container" id='form'>
      <div className="loader-wrapper">
          <span className="loader"><span className="loader-inner"></span></span>
        </div>

        <div className="service-title">
          <input type="text" placeholder="Name of the Club" className="club-title-text-box" name="title" id='title' ref={titleRef} onChange={() => setTitleValue(titleRef.current.value)} /><br />
        </div>

        <div className="service-navbar">
          {allCurrentPages.map((page) => (
            <div className="service-navbar-text" key={page} id={page === "OverviewPage" ? "" : `remove${page}`}>
              <a href="#" className="service-navbar-link" ref={pageRefs.current[page]} onClick={() => changeVisibility(page)}>{page}</a>
              {removablePages.includes(page) && <i className="fa-solid fa-circle-xmark" id="remove-service-navbar-text" onClick={() => deletePage(page)}></i>}
            </div>
          ))}

          <div
            className="service-navbar-plus-container"
            onClick={toggleAddButtons}
            onBlur={hide}
            tabIndex="0"
          >
            <i className="fa-solid fa-circle-plus fa-2x" id="service-navbar-plus">
              {showAddButtons && (
                <div className="add-buttons-container">
                  {allPossiblePages
                    .filter((page) => !allCurrentPages.includes(page))
                    .map((page) => (
                      <button
                        key={page}
                        onClick={() => addPage(page)}
                        className="add-page-button"
                      >
                        Add {page}
                      </button>
                    ))}
                </div>
              )}
            </i>
          </div>
        </div>

        {activePage === "Overview" && <OverviewPage key="OverviewPage" formData={overviewFormData} setFormData={setOverviewFormData} />}
        {activePage === "Contacts" && <ContactsPage key="ContactsPage" formData={contactsFormData} setFormData={setContactsFormData} />}
        {activePage === "FAQ" && <FaqPage key="FaqPage" formData={faqFormData} setFormData={setFaqFormData} />}
        {activePage === "Sign Up" && <SignUpPage key="SignUpPage" mainInfo={
          { 'title': titleValue }
        }
          allFormData={
            {
              'Overview': overviewFormData,
              'Contacts': contactsFormData,
              'FAQ': faqFormData
            }
          } />}

      </form>
    </div>
  );
}

export default AddClub;