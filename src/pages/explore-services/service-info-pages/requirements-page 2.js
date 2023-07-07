import React, { useRef, useState, useEffect } from "react";
import '../../../pages/my-services/add-service.css';

function RequirementsPage({ service }) {
  var Require = [];
  if (service.pages && service.pages.requirements) {
    Require = service.pages.requirements.Requirements;
  }
  return (
    <div className="faq">
      <div id="faq-container">
        <div className="service-header" id="faq-title">
          Requirements
        </div>
        {Require.map((RequirementItem, index) => (
          <div className="contacts-container" key={index}>
            <div className="contacts-text-box" id="question-text-box">
              {RequirementItem.RequireTitle}
            </div>
            <div className="text-button-container">
              <div className="contacts-email-box" id="answer-text-box">
                {RequirementItem.RequireDescription}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RequirementsPage;
