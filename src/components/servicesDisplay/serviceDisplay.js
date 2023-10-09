import React, { useEffect, useState } from "react";
import { BASE_BACKEND_URL } from "../../config";
import ServiceDropdown from "./service-dropdown";
import MobileServiceDropdown from "./mobile-service-dropdown";
import "../../pages/explore-services/main-page.css";
import "../loading-screen.css";
import "../../pages/explore-services/service-filter.css";
import FilterTags from "./FilterTags";
import LoadingUI from "../loading/LoadingUI";
const Buffer = require("buffer").Buffer;

// this function creates each individual service
const DisplayService = function (props) {
  const service = props.service;
  const buffer = Buffer.from(service.thumbnail.data);
  const base64 = buffer.toString("base64");
  const imageUrl = `data:image/png;base64,${base64}`;
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = (event) => {
    event.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const navigateToServiceInfo = () => {
    window.location.href = `/service-info?service=${service._id}`;
  };

  return (
    <div
      className="service-result-card relative"
      id={service._id}
      onClick={navigateToServiceInfo}
    >
      {/* {isBookmarked ? (
        <svg
          viewBox="0 0 82 82"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-3 right-3 h-[40px] w-[40px] select-none md:h-[30px] md:w-[30px] sm:h-[20px] sm:w-[20px]"
          onClick={toggleBookmark}
        >
          <path
            d="M23.9167 61.3975L41.0001 54.0517L58.0834 61.3975V17.0834H23.9167V61.3975Z"
            fill="#ECAA1E"
            fill-opacity="1"
          />
          <path
            d="M58.0833 10.25H23.9166C20.1583 10.25 17.0833 13.325 17.0833 17.0833V71.75L40.9999 61.5L64.9166 71.75V17.0833C64.9166 13.325 61.8416 10.25 58.0833 10.25ZM58.0833 61.3975L40.9999 54.0858L23.9166 61.3975V17.0833H58.0833V61.3975Z"
            fill="#ECAA1E"
          />
        </svg>
      ) : (
        <svg
          viewBox="0 0 82 82"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-3 right-3 h-[40px] w-[40px] select-none md:h-[30px] md:w-[30px]"
          onClick={toggleBookmark}
        >
          <path
            d="M23.9167 61.3975L41.0001 54.0517L58.0834 61.3975V17.0834H23.9167V61.3975Z"
            fill="black"
            fill-opacity="0.2"
          />
          <path
            d="M58.0833 10.25H23.9166C20.1583 10.25 17.0833 13.325 17.0833 17.0833V71.75L40.9999 61.5L64.9166 71.75V17.0833C64.9166 13.325 61.8416 10.25 58.0833 10.25ZM58.0833 61.3975L40.9999 54.0858L23.9166 61.3975V17.0833H58.0833V61.3975Z"
            fill="#ECAA1E"
          />
        </svg>
      )} */}
      <img className="service-result-thumbnail" src={imageUrl} />
      <div className="result-text-container">
        <div className="service-result-title">{service.title}</div>
        <div className="service-result-author">
          {service.pages.overview.subtitle}
        </div>
      </div>
      <a
        className="service-result-button"
        href={`/service-info?service=${service._id}`}
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

export default function ServicesDisplay(props) {
  const serviceTypes = [
    { serviceType: "all", title: "Show All Types" },
    { serviceType: "Club", title: "Clubs & Communities" },
    { serviceType: "Internship", title: "Internships & Work Experience" },
  ];
  const sortingTypes = [
    { title: "Alphabetical", value: "alphabetical" },
    { title: "Reverse Alphabetical", value: "reverse_alphabetical" },
    { title: "Most Recent", value: "newest" },
    { title: "Oldest", value: "oldest" },
  ];
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

  useEffect(() => {
    setUserFilter(props.userFilter ? props.userFilter : ["all"]);
  }, [props.userFilter]);

  // get services from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setShowServices(false);
        const queryParams = new URLSearchParams(window.location.search);
        const keyword = queryParams.get("keyword");
        let url = `${BASE_BACKEND_URL}/servicedata/get-all-services`;
        let categoriesFilterUrl = categoriesFilter.reduce(
          (result, category, index) =>
            index === 0 ? category : `${result}>${category}`,
          ""
        );
        url += `/${sortingType}/${serviceTypeFilter}/${categoriesFilterUrl}/${userFilter}`;
        if (keyword) {
          url += `?keyword=${encodeURIComponent(keyword)}`;
        }

        await fetch(url)
          .then((response) => {
            console.log(response);
            return response.json();
          })
          .then((data) => {
            console.log(data);
            if (data) {
              setServices(data);
            } else {
              setServices([]);
            }
            setShowServices(true);
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [serviceTypeFilter, sortingType, categoriesFilter, userFilter]);

  useState(() => {
    window.addEventListener("resize", () => {
      setIsMobile(window.innerWidth <= 850);
    });
  });

  // return the page
  return (
    <div className="flex flex-col max-w-[100%] w-[1600px]">
      <div className="flex flex-row max-w-[100%] justify-between max-h-[100%] w-[90%] mr-auto ml-auto">
        {!isMobile && (
          <ServiceDropdown
            SetSortingType={setSortingtype}
            SetServiceTypeFilter={setServiceTypeFilter}
            showServices={showServices}
            SetShowServices={setShowServices}
            SetCategoriesFilter={setCategoriesFilter}
            categoriesFilter={categoriesFilter}
            sortingType={sortingType}
            serviceTypes={serviceTypes}
            sortingTypes={sortingTypes}
            serviceTypeFilter={serviceTypeFilter}
          />
        )}{" "}
        {isMobile && (
          <MobileServiceDropdown
            SetSortingType={setSortingtype}
            SetServiceTypeFilter={setServiceTypeFilter}
            serviceTypeFilter={serviceTypeFilter}
            SetCategoriesFilter={setCategoriesFilter}
            categoriesFilter={categoriesFilter}
            sortingType={sortingType}
            serviceTypes={serviceTypes}
            sortingTypes={sortingTypes}
          />
        )}
      </div>
      {!isMobile && (
        <FilterTags
          serviceTypeFilter={serviceTypeFilter}
          SetCategoriesFilter={setCategoriesFilter}
          SetServiceTypeFilter={setServiceTypeFilter}
          categoriesFilter={categoriesFilter}
        />
      )}
      <div className="flex items-center justify-center">
        {/* <div className="loader-wrapper">
          <span className="loader">
            <span className="loader-inner"></span>
          </span>
        </div> */}
        {showServices && <DisplayAllServices services={services} />}
        {!showServices && (
          <div className="w-[100%] h-[60vh]">
            <LoadingUI />
          </div>
        )}
      </div>
    </div>
  );
}
