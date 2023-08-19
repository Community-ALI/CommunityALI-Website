import React, { useRef, useState, useEffect } from "react";
import NavBar from '../../../components/NavBar';
import '../../../components/navbar.css';
import '../add-service.css';
import ContactsPage from "../general-components/contacts-page";
import OverviewPage from "../general-components/overview-page";
import FaqPage from "../general-components/faq-page";
import RequirementsPage from "../general-components/requirements-page";
import SignUpPage from "./sign-up-page";

function AddResource() {
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

  const [showPopUp, setShowPopUp] = useState(false);
  const [additionalPages, setAdditionalPages] = useState([]);
  
  const removablePages = ["Contacts", "FAQ", "Requirements"];

  const [showAddButtons, setShowAddButtons] = useState(false);

  const [activePage, setActivePage] = useState("Overview");

  const [overviewFormData, setOverviewFormData] = useState({});
  const [contactsFormData, setContactsFormData] = useState({});
  const [faqFormData, setFaqFormData] = useState({});
  const [requireFormData, setRequireFormData] = useState({});

  const pageRefs = useRef(allPossiblePages.reduce((refs, page) => {
    refs[page] = useRef(null);
    return refs;
  }, {}));

  const titleRef = useRef(null);
  const [titleValue, setTitleValue] = useState('');
  const changeVisibility = (page) => {
    setActivePage(page);
    Object.keys(pageRefs.current).forEach((key) => {
      const ref = pageRefs.current[key].current;
      if (!ref) return;
      ref.style.borderColor = key === page ? '#001E60' : 'white';
    });
  };
  
    // notify the user that they will loose progress
    const [showPrompt, setShowPrompt] = useState(true);

    const handleShowPromptChange = (value) => {
      setShowPrompt(value);
    };

    useEffect(() => 
    {
      document.title = 'Resource Editor | Community ALI';
    }, []);
  
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
      if (pageToRemove === 'Requirements'){
        setRequireFormData({})
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
        setContactsFormData({
          "contacts": [{ "contactRole": "", "contactName": "", "contactEmail": "" }],
          "socialMedia": [{ "mediaType": "", "mediaName": "", "mediaUrl": "" }]
        })
      }
      else if (pageToAdd === 'FAQ') {
        setFaqFormData({ "faq": [{ "faqQuestion": "", "faqAnswer": "" }] })
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
    if (showAddButtons) {
      setShowPopUp(false);
    } else {
      setAdditionalPages(
        allPossiblePages.filter((page) => !allCurrentPages.includes(page))
      );
      setShowPopUp(true);
    }
    setShowAddButtons((prevState) => !prevState);
  };


  const PopUp = () => {
    return (
      <div className="pop-up-container">
        <div className="pop-up-overlay" />
        <div className="pop-up-content">
          <div className="pop-up-content-title">Select a New Page</div>
          <div className="pop-up-all-pages">
            {additionalPages.map((page) => (
              <div className="pop-up-page" key={page}>
                <button onClick={() => addPage(page)} className="add-page-button">
                  Add {page} Page
                </button>
              </div>
            ))}
          </div>
          <div className="pop-up-content-description">
            Need more pages for your Resource? Contact us for suggestions 
            <a href="mailto:communityalis@gmail.com"> communityalis@gmail.com </a>
          </div>
        </div>
      </div>
    );
  };


  return (
    <div>
      <NavBar isFixedPage={false} />
      <form method="POST" className="service-container" id='form'>
        <div className="service-title">
          <input type="text" placeholder="Name of the Program" className="club-title-text-box" name="title" id='title' ref={titleRef} onChange={() => setTitleValue(titleRef.current.value)} /><br />
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
            <i className="fa-solid fa-circle-plus fa-2x" id="service-navbar-plus" />
            {showPopUp && <PopUp />}
          </div>
        </div>

        {activePage === "Overview" && <OverviewPage key="OverviewPage" formData={overviewFormData} serviceType='Program' setFormData={setOverviewFormData} />}
        {activePage === "Contacts" && <ContactsPage key="ContactsPage" formData={contactsFormData} serviceType='Program' setFormData={setContactsFormData} />}
        {activePage === "FAQ" && <FaqPage key="FaqPage" formData={faqFormData} serviceType='Program' setFormData={setFaqFormData} />}
        {activePage === "Requirements" && <RequirementsPage key="RequirementsPage" formData={requireFormData}  setFormData={setRequireFormData} />}
        {activePage === "Sign Up" && <SignUpPage key="SignUpPage" serviceType='Program' handleShowPromptChange={handleShowPromptChange} mainInfo={
          { 
            'title': titleValue,
            'serviceType': 'Internship'
          }
          
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

export default AddResource;
