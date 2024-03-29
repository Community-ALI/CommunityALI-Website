import React, { useRef, useState, useEffect } from "react";
import '../../../pages/my-services/add-service.css';
import { Buffer } from 'buffer';

function OverviewPage({service}) {
  
  var overview = {}
  var imageUrl = ''
  if (service.pages && service.pages.overview){
   overview = service.pages.overview
   const buffer = Buffer.from(service.thumbnail.data);
   const base64 = buffer.toString('base64');
   imageUrl = `data:image/png;base64,${base64}`;
  }
  return (
    <div>
      <div className="service-info-container">
          <img 
          src={imageUrl}
          id="preview" className="service-image-container">
          </img>
          
        <div className="service-details" id='overview-meeting-details'>
          <div className="service-author">
            {overview.subtitle}
          </div>

          {service.serviceType === "Program" ?
            <div className="service-header">Office Time and Place</div>
            :
            <div className="service-header">Meeting Details</div>
          }

          <div>
            <u> Time: </u>
              {overview.time}
          </div>

          {service.serviceType === 'Program' ? 
            <div>
              <u> Days: </u>       
                {overview.date}   
            </div>
            : 
            <div>
              <u> Date: </u>       
                {overview.date}   
            </div>
          }

          <div>
            <u> Location: </u>
              {overview.location}
          </div>
        </div>
      </div>

      <div className="service-description" style={{ whiteSpace: 'pre-line' }}>
        
        {overview.description}
      </div>
    </div>
  )
}

export default OverviewPage;
