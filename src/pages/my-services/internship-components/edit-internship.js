import React, { useRef, useState, useEffect } from "react";
import {BASE_BACKEND_URL} from '../../../config.js'

import NavBar from '../../../components/NavBar.js';
import '../../../components/navbar.css';
import '../add-service.css';
import ContactsPage from "../general-components/contacts-page.js";
import OverviewPage from "../general-components/overview-page.js";
import RequirementsPage from "./requirements-page";
import FaqPage from "../general-components/faq-page.js";
import SignUpPage from "./sign-up-page.js";
import { Buffer } from 'buffer';

function AddInternship() {
  const allPossiblePages = [
    "Overview",
    "Contacts",
    "FAQ",
    "Requirements",
    "Sign Up"
  ];

  const [allCurrentPages, setAllCurrentPages] = useState([
    "Overview",
    "Sign Up"
  ]);

  const removablePages = ["Contacts", "FAQ", "Requirements"];

  const [showAddButtons, setShowAddButtons] = useState(false);

  const [activePage, setActivePage] = useState("Overview");

  const [overviewFormData, setOverviewFormData] = useState({});
  const [contactsFormData, setContactsFormData] = useState({});
  const [requireFormData, setRequireFormData] = useState({});
  const [faqFormData, setFaqFormData] = useState({});

  const pageRefs = useRef(allPossiblePages.reduce((refs, page) => {
    refs[page] = useRef(null);
    return refs;
  }, {}));

  const titleRef = useRef(null);
  const [titleValue, setTitleValue] = useState('');

    // notify the user that they will loose progress
    const [showPrompt, setShowPrompt] = useState(true);

    const handleShowPromptChange = (value) => {
      setShowPrompt(value);
    };
  
    useEffect(() => {
      const handleBeforeUnload = (event) => {
        if (showPrompt){
          event.preventDefault();
          event.returnValue = ''; // Required for Chrome
        }
      };
  
      window.addEventListener('beforeunload', handleBeforeUnload);
  
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }, []);
  useEffect(() => {
    const fetchData = async () => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);

      const serviceName = urlParams.get('service');
          
      const response = await fetch(`${BASE_BACKEND_URL}/get-one-service?service=` + serviceName)
          .then(response => response.json())
          .then(data => {
              const buffer = Buffer.from(data.photo.data, 'base64');
              const selectedFile = new File([buffer], 'Previous Image.png', { type: 'image/png' });
              // title
              titleRef.current.value = data.title;
              setTitleValue(data.title);
              // overview
              setOverviewFormData(data.pages.overview); 
              // image
              setOverviewFormData((prevData) => ({ ...prevData, file: selectedFile }));
              // Contacts
              if (data.pages.contacts){
                addPage('Contacts');
                setContactsFormData(data.pages.contacts);
              }
              if (data.pages.FAQ){
                addPage('FAQ');
                setFaqFormData(data.pages.FAQ);
              }
              if (data.pages.requirements){
                addPage('Requirements');
                setRequireFormData(data.pages.requirements);
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
      if (pageToRemove === 'Requirements'){
        setRequireFormData({})
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
      else if (pageToAdd === 'Requirements') {
        setFaqFormData({ "Requirements": [{ "RequireTitle": "", "RequireDescription": "" }] })
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
          <input type="text" placeholder="Name of the Internship" className="club-title-text-box" name="title" id='title' ref={titleRef} onChange={() => setTitleValue(titleRef.current.value)} /><br />
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

        {activePage === "Overview" && <OverviewPage key="OverviewPage" formData={overviewFormData} setFormData={setOverviewFormData} serviceType='Internship' editMode={true}  />}
        {activePage === "Contacts" && <ContactsPage key="ContactsPage" formData={contactsFormData} setFormData={setContactsFormData} serviceType='Internship' />}
        {activePage === "FAQ" && <FaqPage key="FaqPage" formData={faqFormData} setFormData={setFaqFormData} serviceType='Internship' />}
        {activePage === "Requirements" && <RequirementsPage key="RequirementsPage" formData={requireFormData}  setFormData={setRequireFormData} />}
        {activePage === "Sign Up" && <SignUpPage key="SignUpPage" editMode={true} serviceType='Internship' handleShowPromptChange={handleShowPromptChange} mainInfo={
          { 'title': titleValue }
        }
        allFormData={
          {
            'Overview': overviewFormData,
            'Contacts': contactsFormData,
            'Requirements': requireFormData,
            'FAQ': faqFormData
          }
        } />}

      </form>
    </div>
  );
}

export default AddInternship;