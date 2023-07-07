import React, { useRef, useState, useEffect } from "react";
import '../../../pages/my-services/add-service.css';

function FaqPage({ service }) {
  var FAQ = [];
  if (service.pages && service.pages.FAQ) {
    FAQ = service.pages.FAQ.faq;
  }
  return (
    <div className="faq">
      <div id="faq-container">
        <div className="service-header" id="faq-title">
          Frequently Asked Questions
        </div>
        {FAQ.map((faqItem, index) => (
          <div className="contacts-container" key={index}>
            <div className="contacts-text-box" id="question-text-box">
              {faqItem.faqQuestion}
            </div>
            <div className="text-button-container">
              <div className="contacts-email-box" id="answer-text-box">
                {faqItem.faqAnswer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FaqPage;
