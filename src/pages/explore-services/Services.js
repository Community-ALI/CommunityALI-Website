import React, { Component, useEffect, useState} from 'react';
import video from '../../../public/videos//Webvideo ULTRA COMPRESSED.mp4'
import '../../index.css'
import fallBackImage from '../../../public/Photos/NoPhoto.jpg'

const SearchResult = function (props) {
  const service = props.service;

  let imageSrc;
  try {
    const imageData = service.photo.toString('base64');
    const defaultMimeType = 'image/octet-stream';
    imageSrc = `data:${defaultMimeType};base64,${imageData}`;
  } catch (error) {
    // Handle the error if 'service.photo' or 'service.photoType' is not in the expected format
    console.log('Error generating image source:', error);
    // You can provide a fallback image source here
    imageSrc = '/fallback-image.png';
  }

  return (
    <div className="result-container" id={service.title}>
      <img className="result-picture" src={imageSrc} />
      <div className="result-text-container">
        <div className="result-title">{service.title}</div>
        <div className="result-author">
          {service.author_role}: {service.author}
        </div>
      </div>
      <div className="button-container">
        <a className="button" href={`/explore-services/service-info?service=${service.title}`}>
          Click for more info
        </a>
      </div>
    </div>
  );
};

function DisplaySearchResults(props) {
const results = props.services;
if (results){
    return (
    <div className="results">
      {results.map(function (service) {
        return <SearchResult service={service} key={service.title} />;
      })}
    </div>
  );
  }
};


function Services() {

    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            console.log('sending request');
            const response = await fetch('http://localhost:8080/explore-services/get-services')
              .then(response => response.json())
              .then(data => {
                // 'data' variable will contain the received array
                 // Do something with the array
                console.log(data);
                setServices(data);
                
              })
            
          } catch (error) {
           
          }
        };
    
        fetchData();
      }, []);

      useEffect(() => {
        console.log(services);
      }, [services]);
      
    return(
        <div className="header">
            <DisplaySearchResults services = {services}/> 
        </div>  
    )
}

export default Services;