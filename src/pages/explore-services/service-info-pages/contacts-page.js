import React, { useState } from "react";
import '../../../pages/my-services/add-service.css';

function ContactsPage() {

  return (
    <div>
    <div className="service-info2-container">
      <div className="service-details" id="contact-container">
        <div className="service-header">Contact Us</div>
          <div className="contacts-container">
            <div>
              <u className="club-contacts-selection"> President: </u>
              Kirill Kovalenko
            </div>
            <div className="text-button-container">
              <a 
              className="service-contact-link" 
              href="mailto: kirillkovalenko@hotmail.com">
              kirillkovalenko@hotmail.com   
              </a>        
            </div>
          </div>

          <div className="contacts-container">
            <div>
              <u className="club-contacts-selection"> Advisor: </u>
              Benjamin Schoolland
            </div>
            <div className="text-button-container">
              <a 
              className="service-contact-link" 
              href="mailto: bschoolland@gmail.com">
              bschoolland@gmail.com    
              </a>        
            </div>
          </div>

          <div className="contacts-container">
            <div>
              <u className="club-contacts-selection"> Vice-President: </u>
              Mason Partridge
            </div>
            <div className="text-button-container">
              <a className="service-contact-link" 
              href="mailto: masonepartridge@gmail.com">
              masonepartridge@gmail.com      
              </a>        
            </div>
          </div>
      </div>

      <div className="service-details" id="social-media-container">
        <div className="service-header">Follow our Social Media</div>
          <div>
            <u className="club-contacts-selection"> Instagram: </u>
            <a 
            className="service-contact-link" 
            href="https://www.instagram.com/community_ali/">
            @Community_Ali
            </a>
          </div>

          <div>
            <u className="club-contacts-selection"> Youtube: </u>
            <a 
            className="service-contact-link" 
            href="https://www.youtube.com/@communitycatalyst/videos">
            Community Catalyst
            </a>
          </div>

          <div>
            <u className="club-contacts-selection"> Twitter: </u>
            <a 
            className="service-contact-link" 
            href="https://twitter.com/Community_ALIs">
            @Community_ALIs
            </a>
          </div>
      </div>
    </div>
  </div>
  );
}

export default ContactsPage;
