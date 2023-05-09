import React, { Component, useState, useEffect } from "react";
import './main-page.css';

// create the information required to display the page
function MyServicePageDisplay(props) {
    const service = props.service;

    return (
        <div 
            className="user-service"
        >
            <a className = "background-link" href = "view-applicants.html"></a>
            <div className="option-container-service">
                <a 
                    className="user-link " 
                    href="view-applicants.html"
                >
                    <i className="fa-solid fa-users fa-2x"></i>
                </a>
                <a className="user-service-text" href = "view-applicants.html">MJC Math and Engineering Club</a>
                <a className = "user-link edit-button" href = {"edit-service?service="+service.title}></a>
            </div>
        </div>
    )
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

function MyServicesHome() {
 
    const [services, setServices] = useState([]);
    const [username, setUsername] = useState('no username associated with token')

    useEffect(() => {
        const fetchData = async () => {
          try {
            console.log('sending request');
            const response = await fetch('/view-my-services')
              .then(response => response.json())
              .then(data => {
                // 'data' variable will contain the received object with the data array and tokenUsername
                 // Do something with the array
                console.log(data.dataServices);
                setServices(data.dataServices);
                setUsername(data.tokenUsername);
              })
            
          } catch (error) {
           
          }
        };
    
        fetchData();
    }, []);        

    useEffect(() => {
        console.log(services);
      }, [services]);

    return (
    <div>
        <div className = "username-title">
            {"Welcome: " + username}
        </div>
        <div className = "user-service">
            <a className = "background-link" href = "add-service.html"></a>
            <a className = "user-link" href = "add-service.html">
                <div className = "option-container">
                    <i className = "fa-solid fa-plus fa-2x"></i>
                    <p className = "user-service-text">Add a New Service</p>
                </div>
                {services.forEach(service => {
                    <MyServicePageDisplay service = {service} />
                })}
            </a>
        </div>
    </div>
 )
}

export default MyServicesHome;