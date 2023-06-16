import React, { useRef, useState, useEffect } from "react";
import '../../../pages/my-services/add-service.css';

function OverviewPage() {

  return (
    <div>
      <div className="service-info-container">
          <img 
          src="../../../Photos/computerscience.jpg" 
          id="preview" className="service-image-container">
          </img>
          
        <div className="service-details">
          <div className="service-author">
           President Adrean Cajigas
          </div>

          <div className="service-header">Meeting Details</div>

          <div>
            <u> Time: </u>
            9:00am - 11:00am
          </div>

          <div>
            <u> Date: </u>       
            Every Friday   
          </div>

          <div>
            <u> Location: </u>
            MJC West Campus Study Room
          </div>
        </div>
      </div>

      <div className="service-description">
      We strive to integrate life experiences with academia to promote educational 
      success and personal growth by granting students the opportunity to connect 
      with their local community and beyond. By developing a deeper connection with 
      Modesto Junior College, students can further their education by understanding 
      the purpose and application of knowledge gained from a classroom to the real 
      world.
      </div>
    </div>
  )
}

export default OverviewPage;
