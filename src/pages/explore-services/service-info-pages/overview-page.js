import React, { useRef, useState, useEffect } from "react";
import '../../../pages/my-services/add-service.css';

function OverviewPage() {

  return (
    <div>
      <div>
        <div className="service-info-container">
          <div className="file-container">
            <img id="previewImage" src={'./Photos/ACE Unity Club.jpg'} alt="Preview"></img>
          </div>

          <div className="service-details">
            <div className="service-author">
              <h1 className="meeting-details-title-box">President of the Club</h1>
              <br />
            </div>

            <div className="service-header">Meeting Details</div>

            <div>
              <u> Time: </u>
              <h1 className="meeting-details-text-box">Include start and end time</h1>
              <br />
            </div>

            <div>
              <u> Date: </u>
              <h1 className="meeting-details-text-box">Include day and month</h1>
              <br />
            </div>

            <div>
              <u> Location: </u>
              <h1 className="meeting-details-text-box">Include building and room</h1>
              <br />
            </div>
          </div>
        </div>

        <div className="service-description">
          <p className="meeting-description-text-box">Include a description of what the club does and its mission...</p>
        </div>
      </div>
    </div>
  );
}

export default OverviewPage;
