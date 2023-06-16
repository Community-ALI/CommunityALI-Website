import React, { useRef, useState, useEffect } from "react";
import '../../../pages/my-services/add-service.css';

function OverviewPage({service}) {
  
  var overview = {}
  if (service.pages && service.pages.overview){
   overview = service.pages.overview
  }
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
              {overview.time}
          </div>

          <div>
            <u> Date: </u>       
              {overview.date}   
          </div>

          <div>
            <u> Location: </u>
              {overview.location}
          </div>
        </div>
      </div>

      <div className="service-description">
        {overview.description}
      </div>
    </div>
  )
}

export default OverviewPage;
