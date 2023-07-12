import React, { Component, useState, useEffect } from "react";
// import '../components/footer.css';
import NavBar from '../../components/NavBar';
import '../../components/navbar.css';
//import './add-club.css';
import {BASE_BACKEND_URL} from '../../config.js'
function EditService() {

  useEffect(() => {
    const fetchData = async () => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);

      const serviceName = urlParams.get('service');
          
      const response = await fetch(`${BASE_BACKEND_URL}/get-one-service?service=` + serviceName)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            console.log(data.serviceType);
            if (data.serviceType == 'Club'){
              window.location.href = `edit-club?service=${serviceName}`
            }
            else if (data.serviceType == 'Internship'){
              window.location.href = `edit-internship?service=${serviceName}`
            }
            
          })
    };
    fetchData();
  }, []);
      
  // simply wait
  return (
    <div>
        <NavBar></NavBar>
        <div className="loader-wrapper">
          <span className="loader"><span className="loader-inner"></span></span>
        </div>
    </div>
  );
}

export default EditService;
