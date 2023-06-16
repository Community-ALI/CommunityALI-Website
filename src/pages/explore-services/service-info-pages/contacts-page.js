import React, { useState } from "react";
import '../../../pages/my-services/add-service.css';

function ContactsPage({ service }) {
  var contacts = [];
  if (service.pages && service.pages.contacts) {
    contacts = service.pages.contacts.contacts;
  }
  var socialMedia = [];
  if (service.pages && service.pages.contacts.socialMedia) {
    socialMedia = service.pages.contacts.socialMedia;
  }

  return (
    <div>
      <div className="service-info2-container">
        <div className="service-details" id="contact-container">
          <div className="service-header">Contact Us</div>
          {contacts.map((contact, index) => (
            <div className="contacts-container" key={index}>
              <div>
                <u className="club-contacts-selection">{contact.contactRole} : </u>
                {contact.contactName}
              </div>
              <div className="text-button-container">
                <a className="service-contact-link" href={`mailto:${contact.contactEmail}`}>
                  {contact.contactEmail}
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="service-details" id="social-media-container">
          <div className="service-header">Follow our Social Media</div>
          {socialMedia.map((media, index) => (
            <div className="contacts-container" key={index}>
              <div>
                <u className="club-contacts-selection">{media.mediaType} : </u>
                {media.mediaName}
              </div>
              <div className="text-button-container">
                <p className="service-contact-link">
                  {media.mediaUrl}
                </p>
            </div>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ContactsPage;
