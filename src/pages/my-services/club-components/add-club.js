import React, { useRef, Component, useState, useEffect } from "react";
// import '../components/footer.css';
import NavBar from '../../../components/NavBar';
import '../../../components/navbar.css';
import './add-club.css';
import { document } from "postcss";
import ContactsPage from "./contacts-page";
import OverviewPage from "./overview-page";
import FaqPage from "./faq-page";
import SignUpPage from "./sign-up-page";

function AddService() {

  const [active, setActive] = useState("OverviewPage")
  const[removePage2, setRemovePage2] = useState("page2");
  const[removePage3, setRemovePage3] = useState("page3");

  const overviewRef = useRef(null);
  const contactRef = useRef(null);
  const faqRef = useRef(null);
  const signUpRef = useRef(null);

  const changeVisibility1=()=>{
    overviewRef.current.style.borderColor = '#001E60';
    contactRef.current.style.borderColor = 'white';
    faqRef.current.style.borderColor = 'white';
    signUpRef.current.style.borderColor = 'white';
    setActive("OverviewPage");
  }

  const changeVisibility2=()=>{
    contactRef.current.style.borderColor = '#001E60';
    overviewRef.current.style.borderColor = 'white';
    faqRef.current.style.borderColor = 'white';
    signUpRef.current.style.borderColor = 'white';
    setActive("ContactsPage");
  }

  const changeVisibility3=()=>{
    faqRef.current.style.borderColor = '#001E60';
    overviewRef.current.style.borderColor = 'white';
    contactRef.current.style.borderColor = 'white';
    signUpRef.current.style.borderColor = 'white';
    setActive("FaqPage");
  }

  const changeVisibility4=()=>{
    signUpRef.current.style.borderColor = '#001E60';
    overviewRef.current.style.borderColor = 'white';
    faqRef.current.style.borderColor = 'white';
    overviewRef.current.style.borderColor = 'white';
    setActive("SignUpPage");
  }

  const deletePage2=()=>{
    setRemovePage2("removePage2");
  }

  const deletePage3=()=>{
    setRemovePage3("removePage3");
  }
    
  return (
    <div>
      <NavBar isFixedPage={false} />,
      <form action="/store-service" method="POST" 
      className="service-container" id='form'>

        <div className="service-title">
          <input type="text" placeholder="Name of the Club" 
          className="club-title-text-box" name="title" id='title'/><br />
        </div>

        <div className="service-navbar">
          <div className="service-navbar-text">
            <a href="#" className="service-navbar-link" ref={overviewRef}
            onClick={changeVisibility1} id="overviewColor"
            >Overview</a>
          </div>

          <div className="service-navbar-text" id={removePage2}>
            <a href="#" className="service-navbar-link" ref={contactRef}
            onClick={changeVisibility2}
            >Contacts & Social Media</a>

            <i class="fa-solid fa-circle-xmark" id="remove-service-navbar-text"
            onClick={deletePage2}></i>
          </div>

          <div className="service-navbar-text" id={removePage3}>
            <a href="#" className="service-navbar-link" ref={faqRef}
            onClick={changeVisibility3} 
            >FAQ</a>
            
            <i class="fa-solid fa-circle-xmark" id="remove-service-navbar-text"
            onClick={deletePage3} ></i>
          </div>

          <div className="service-navbar-text">
            <a href="#" className="service-navbar-link" ref={signUpRef}
            onClick={changeVisibility4} 
            >Sign Up Today</a>
          </div>
          
          <div className="service-navbar-plus-container">
            <i class="fa-solid fa-circle-plus fa-2x" id="service-navbar-plus"></i> 
          </div>
        </div>
        
        {active === "OverviewPage" && <OverviewPage/>}
        {active === "ContactsPage" &&  <ContactsPage/>}
        {active === "FaqPage" &&  <FaqPage/>}
        {active === "SignUpPage" &&  <SignUpPage/>}
      
      </form>
    </div>
  );
}

export default AddService;
