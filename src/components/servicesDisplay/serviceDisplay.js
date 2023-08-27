import React, { useEffect, useState } from "react";
import { BASE_BACKEND_URL } from "../../config";
import ServiceDropdown from "./service-dropdown";
import MobileServiceDropdown from "./mobile-service-dropdown";
import "../../pages/explore-services/main-page.css";
import "../loading-screen.css";
import "../../pages/explore-services/service-filter.css";
const Buffer = require("buffer").Buffer;

// this function creates each individual service
const DisplayService = function (props) {
  const service = props.service;
  const buffer = Buffer.from(service.thumbnail.data);
  const base64 = buffer.toString("base64");
  const imageUrl = `data:image/png;base64,${base64}`;

  return (
    <div
      className="service-result-card"
      id={service.title}
      onClick={() =>
        (window.location.href = `/service-info?service=${service.title}`)
      }
    >
      <img className="service-result-thumbnail" src={imageUrl} />
      <div className="result-text-container">
        <div className="service-result-title">{service.title}</div>
        <div className="service-result-author">
          {service.pages.overview.subtitle}
        </div>
      </div>
      <a
        className="service-result-button"
        href={`/service-info?service=${service.title}`}
      >
        Click for more info
      </a>
    </div>
  );
};

// This function repeadedly calls Display Service to display all the services in the provided array
function DisplayAllServices(props) {
  const results = props.services;

  if (!Array.isArray(results) || results.length === 0) {
    return (
      <div id="no-service-found-container">
        <div id="no-service-found-title">
          <i
            className="fa-solid fa-circle-exclamation fa-2x"
            id="no-service-found-icon"
          ></i>
          <div id="no-service-found-text"> No Services Found</div>
        </div>
        <div id="no-service-found-description">
          Please try again or contact technical support for more assistance.
        </div>
      </div>
    );
  }

  return (
    <div id="explore-service-results">
      {results.map(function (service) {
        return <DisplayService service={service} key={service.title} />;
      })}
    </div>
  );
}

function ServicesDisplay(props) {
  const [services, setServices] = useState([]);
  const [sortingType, setSortingtype] = useState("alphabetical");
  const [serviceTypeFilter, setServiceTypeFilter] = useState([
    props.startingfilter,
  ]);
  const [userFilter, setUserFilter] = useState(
    props.userFilter ? props.userFilter : ["all"]
  );
  const [categoriesFilter, setCategoriesFilter] = useState(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const categories = queryParams.getAll("filter");
    return categories.length > 0 ? categories : ["all"];
  });

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 850);
  const [showServices, setShowServices] = useState(true);

  // get services from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams(window.location.search);
        const keyword = queryParams.get("keyword");
        let url = `${BASE_BACKEND_URL}/servicedata/get-all-services`;
        let categoriesFilterUrl = categoriesFilter.reduce(
          (result, category, index) =>
            index === 0 ? category : `${result}>${category}`,
          ""
        );
        url += `/${sortingType}/${serviceTypeFilter}/${categoriesFilter}/${userFilter}`;
        if (keyword) {
          url += `?keyword=${encodeURIComponent(keyword)}`;
        }

        const response = await fetch(url);
        console.log(response);
        const data = await response.json();
        console.log(data);
        setServices(data || []);

        const loaderWrapper = document.querySelector(".loader-wrapper");
        loaderWrapper.style.transition = "opacity 0.5s";
        loaderWrapper.style.opacity = "0";
        setTimeout(() => {
          loaderWrapper.style.display = "none";
        }, 500);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [serviceTypeFilter, sortingType, categoriesFilter]);

  useState(() => {
    window.addEventListener("resize", () => {
      setIsMobile(window.innerWidth <= 850);
    });
  });

  // return the page
  return (
    <div className="flex flex-col ">
      <div className="flex w-[100%] flex-row justify-between">
        {!isMobile && (
          <ServiceDropdown
            SetSortingType={setSortingtype}
            SetServiceTypeFilter={setServiceTypeFilter}
            serviceTypeFilter={serviceTypeFilter}
            SetCategoriesFilter={setCategoriesFilter}
            categoriesFilter={categoriesFilter}
          />
        )}{" "}
        {isMobile && (
          <MobileServiceDropdown
            SetSortingType={setSortingtype}
            SetServiceTypeFilter={setServiceTypeFilter}
            serviceTypeFilter={serviceTypeFilter}
            SetCategoriesFilter={setCategoriesFilter}
            categoriesFilter={categoriesFilter}
            showServices={showServices}
            SetShowServices={setShowServices}
          />
        )}
        <div></div>
      </div>
      <div className="flex">
        <title> Explore Services </title>
        <div className="loader-wrapper">
          <span className="loader">
            <span className="loader-inner"></span>
          </span>
        </div>
        {showServices && <DisplayAllServices services={services} />}
      </div>
    </div>
  );
}

export default ServicesDisplay;
