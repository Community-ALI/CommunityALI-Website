import React, { Component, useEffect, useState} from 'react';
import '../../pages/explore-services/main-page.css'
import NavBar from '../../components/NavBar';
import Footer from "../../components/Footer";
const Buffer = require('buffer').Buffer;

// this function creates each individual service
const DisplayService = function (props) {
  const service = props.service;
  const buffer = Buffer.from(service.thumbnail.data);
  const base64 = buffer.toString('base64');
  const imageUrl = `data:image/png;base64,${base64}`;
  return (
    <div className="service-result-container" id={service.title} onClick={() => window.location.href = `/service-info?service=${service.title}` } >
      <img className="result-picture" src={imageUrl} />
      <div className="result-text-container">
        <div className="result-title">{service.title}</div>
        <div className="result-author">
          {service.author_role}: {service.author}
        </div>
      </div>
      <div className="button-container">
        <a className="service-button" href={`/service-info?service=${service.title}`}>
          Click for more info
        </a>
      </div>
    </div>
  );
};

// this function repeadedly calls Display Service to display all the services in the provided array
function DisplayAllServices(props) {
const results = props.services;
if (results){
    return (
    <div className="results">
      {results.map(function (service) {
        return <DisplayService service={service} key={service.title} />;
      })}
    </div>
  );
  }
};

function Services() {
    const [services, setServices] = useState([]);

    // get services from the backend
    useEffect(() => {
      const fetchData = async () => {
        try {

          const queryParams = new URLSearchParams(window.location.search);
          const keyword = queryParams.get('keyword');
          console.log(keyword);

          // Create the URL with query parameters
          let url = 'http://localhost:3000/get-all-services';
          if (keyword) {
              url += '?';
              url += `keyword=${encodeURIComponent(keyword)}`;
          }

          const response = await fetch(url)
            .then(response => response.json())
            .then(data => {
              // 'data' variable will contain the received array
              setServices(data);

              // show the page
              const loaderWrapper = document.querySelector(".loader-wrapper");
              loaderWrapper.style.transition = "opacity 0.5s";
              loaderWrapper.style.opacity = "0";
              setTimeout(() => {
                  loaderWrapper.style.display = "none";
              }, 500); // fade out duration in milliseconds
            })
          
        } catch (error) {
          // FIXME: add error handling
        }
      };
      fetchData();
    }, []);
    
    // return the page
    return(
        <div>

            <div className="loader-wrapper">
                <span className="loader"><span className="loader-inner"></span></span>
            </div>
            <NavBar isFixedPage={false} />
            <div className = "search-result-container">
                <div className ="results">
                  <DisplayAllServices services = {services}/>
                </div>
            </div>
            
            <Footer />
        </div>
    )
}

export default Services;