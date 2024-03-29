import React, { Component, useState } from "react";
import "./footer.css";
import PrivacyPopUp from "./PrivacyPopUp";
import PopupComponent from "./popupComponent";

function Footer() {
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  return (
    <footer>
      <div className="footer-container">
        <a
          href="https://www.facebook.com/profile.php?id=100089185347335&amp;mibextid=ZbWKwL"
          target="_blank"
          aria-label="Facebook"
        >
          <i
            className="fa fa-facebook white-text mr-md-5 mr-3 fa-lg"
            aria-hidden="true"
          ></i>
        </a>
        <a
          href="https://twitter.com/Community_ALIs"
          target="_blank"
          aria-label="Twitter"
        >
          <i
            className="fa fa-twitter white-text mr-md-5 mr-3 fa-lg"
            aria-hidden="true"
          ></i>
        </a>
        <a
          href="https://www.instagram.com/community_ali/"
          target="_blank"
          aria-label="Instagram"
        >
          <i
            className="fa fa-instagram white-text mr-md-5 mr-3 fa-lg"
            aria-hidden="true"
          ></i>
        </a>
        <a id="tech-support" href="/contact-form">
          {" "}
          Technical Support{" "}
        </a>
      </div>
      <div className="footer-text">
        <p>
          {" "}
          Community ALI is not directly affiliated with Modesto Junior College
          or any of its subsidiaries.{" "}
        </p>
        <u className="cursor-pointer"
          onClick={() => {
            setShowPrivacyPolicy(true);
          }}
        >
          Privacy Policy
        </u>
      </div>
      <PopupComponent
        isShowingPopup={showPrivacyPolicy}
        SetIsShowingPopupFalse={() => setShowPrivacyPolicy(false)}
        popupToRender={<PrivacyPopUp />}
      />
    </footer>
  );
}

export default Footer;
