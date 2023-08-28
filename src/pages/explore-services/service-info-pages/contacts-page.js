import React, { useState } from "react";
import '../../../pages/my-services/add-service.css';

function ContactsPage({ service }) {
  var contacts = [];
  if (service.pages && service.pages.contacts) {
    contacts = service.pages.contacts.contacts;
  }


  return (
    <div>
      <div className="service-info2-container">
        {contacts.length > 0 && (
          <div className="service-details" id="contact-container">
            <div className="service-header">Contact Us</div>
            {contacts.map((contact, index) => (
              <div className="contacts-container" id='contact-page-container' key={index}>
                <div className="service-contact-name">
                  <u className="club-contacts-selection">{contact.contactRole}</u>
                  {contact.contactName} -  
                </div>
                <div className="text-button-container">
                  <a className="service-contact-link" href={`mailto:${contact.contactEmail}`}>
                     {contact.contactEmail}
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default ContactsPage;
