import React, { Component, useEffect, useState } from 'react';
import { BASE_BACKEND_URL } from '../../config.js'
import '../../pages/explore-services/main-page.css'
import NavBar from '../../components/NavBar';
import Footer from "../../components/Footer";
import ServiceDropdown from './service-dropdown.js';
import MobileServiceDropdown from './mobile-service-dropdown.js';
const Buffer = require('buffer').Buffer;

// this function creates each individual service
const DisplayService = function (props) {


  const service = props.service;
  const buffer = Buffer.from(service.thumbnail.data);
  const base64 = buffer.toString('base64');
  const imageUrl = `data:image/png;base64,${base64}`;

  return (
    <div className="service-result-container" id={service.title} onClick={() => window.location.href = `/service-info?service=${service.title}`} >
      <title> Explore Page </title>
      <img className="result-picture" src={imageUrl} />
      <div className="result-text-container">
        <div className="result-title">{service.title}</div>
        <div className="result-author">
          {service.pages.overview.subtitle}
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

  if (!Array.isArray(results) || results.length === 0) {
    return (
      <div className="no-service-found-container">
        <div className="not-found-container">
          <i className="fa-solid fa-circle-exclamation fa-2x" id="not-found-exclamation"></i>
          <div className='not-found-text'> No Services Found</div>
        </div>
        <div className='not-found-description'>
          Please try again or contact technical support for more assistance.
        </div>
      </div>
    );
  }

  if (!results || results.length === 0) {
    return <div>No services found.</div>;
  }

  return (
    <div className="results">
      {results.map(function (service) {
        return <DisplayService service={service} key={service.title} />;
      })}
    </div>
  );
}

function Services(props) {
  const [services, setServices] = useState([]);
  const [sortingType, setSortingtype] = useState('alphabetical');
  const [serviceTypeFilter, setServiceTypeFilter] = useState([props.startingfilter]);
  const [categoriesFilter, setCategoriesFilter] = useState(['all']);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 425);
  const [showServices, setShowServices] = useState(true)


  // get services from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams(window.location.search);
        const keyword = queryParams.get('keyword');
        let url = `${BASE_BACKEND_URL}/get-all-services`;
        let categoriesFilterUrl = categoriesFilter.reduce(
          (result, category, index) => (index === 0) ? category
            : `${result}>${category}`, '')
        url += `/${sortingType}/${serviceTypeFilter}/${categoriesFilter}`;
        if (keyword) {
          url += `?keyword=${encodeURIComponent(keyword)}`;
        }


        const response = await fetch(url);
        const data = await response.json();
        setServices(data || []);

        const loaderWrapper = document.querySelector('.loader-wrapper');
        loaderWrapper.style.transition = 'opacity 0.5s';
        loaderWrapper.style.opacity = '0';
        setTimeout(() => {
          loaderWrapper.style.display = 'none';
        }, 500);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [serviceTypeFilter, sortingType, categoriesFilter]);

  useState(() => {
    console.log(window.innerWidth);
    window.addEventListener('resize', (() => {
      console.log(window.innerWidth);
      setIsMobile(window.innerWidth <= 425)
    }));
  })

  // return the page
  return (
    <div>

      <div className="loader-wrapper">
        <span className="loader"><span className="loader-inner"></span></span>
      </div>
      <NavBar isFixedPage={false} />

      <div className="search-result-container">
        {!isMobile &&
          <ServiceDropdown
            SetSortingType={setSortingtype}
            SetServiceTypeFilter={setServiceTypeFilter}
            serviceTypeFilter={serviceTypeFilter}
            SetCategoriesFilter={setCategoriesFilter}
            categoriesFilter={categoriesFilter}
          />} {isMobile &&
            <MobileServiceDropdown
              SetSortingType={setSortingtype}
              SetServiceTypeFilter={setServiceTypeFilter}
              serviceTypeFilter={serviceTypeFilter}
              SetCategoriesFilter={setCategoriesFilter}
              categoriesFilter={categoriesFilter}
              showServices={showServices}
              SetShowServices={setShowServices}
            />}
        {showServices &&
          <div className="results">
            <DisplayAllServices services={services} />
          </div>}
      </div>

      <Footer />
    </div>
  )
}

export default Services;