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
  const[styleColor1, setStyleColor1] = useState("overviewChangeColor");
  const[styleColor2, setStyleColor2] = useState("contactColor");
  const[styleColor3, setStyleColor3] = useState("faqColor");
  const[styleColor4, setStyleColor4] = useState("signUpColor");
  const[removePage2, setRemovePage2] = useState("page2");
  const[removePage3, setRemovePage3] = useState("page3");

  const changeVisibility1=()=>{
    setStyleColor1("overviewChangeColor");
    setStyleColor2("contactColor");
    setStyleColor3("faqColor");
    setStyleColor4("signUpColor");
    setActive("OverviewPage");
  }

  const changeVisibility2=()=>{
    setStyleColor1("overviewColor");
    setStyleColor2("contactChangeColor");
    setStyleColor3("faqColor");
    setStyleColor4("signUpColor");
    setActive("ContactsPage");
  }

  const changeVisibility3=()=>{
    setStyleColor1("overviewColor");
    setStyleColor2("contactColor");
    setStyleColor3("faqChangeColor");
    setStyleColor4("signUpColor");
    setActive("FaqPage");
  }

  const changeVisibility4=()=>{
    setStyleColor1("overviewColor");
    setStyleColor2("contactColor");
    setStyleColor3("faqColor");
    setStyleColor4("signUpChangeColor");
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
            <a href="#" className="service-navbar-link" 
            onClick={changeVisibility1} 
            id={styleColor1} >Overview</a>
          </div>

          <div className="service-navbar-text" id={removePage2}>
            <a href="#" className="service-navbar-link" 
            onClick={changeVisibility2}
            id={styleColor2} >Contacts & Social Media</a>
            <i class="fa-solid fa-circle-xmark" id="remove-service-navbar-text"
            onClick={deletePage2}></i>
          </div>

          <div className="service-navbar-text" id={removePage3}>
            <a href="#" className="service-navbar-link" 
            onClick={changeVisibility3} 
            id={styleColor3}>FAQ</a>
            <i class="fa-solid fa-circle-xmark" id="remove-service-navbar-text"
            onClick={deletePage3} ></i>
          </div>

          <div className="service-navbar-text">
            <a href="#" className="service-navbar-link" 
            onClick={changeVisibility4} 
            id={styleColor4}>Sign Up Today</a>
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
