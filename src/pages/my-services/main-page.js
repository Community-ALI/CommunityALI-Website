import React, { Component, useState, useEffect } from "react";
import './main-page.css';
import '../../../public/stylesheets/style.css'
import NavBar from '../../components/NavBar';
import Notifications from "../../components/Notification";
import DeleteServicePopup from '../../components/DeleteServicePopup'
// create the information required to display the page

function MyServicePageDisplay(props) {
  const [notifications, setNotifications] = useState([]);
  const service = props.service;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await fetch('http://localhost:3000/get-service-notifications?service=' + service.title,
            {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            })
            .then(response => response.json())
            .then(data => {
              // 'data' variable will contain the received object with the data array and tokenUsername

              setNotifications(data);
              console.log('notification data: ', data);
            })
        }
        else {
          console.log('no token found')
        }
      } catch (error) {
        console.log(error)
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(applicants);
  })

  const handleBackgroundClick = () => {
    window.location.href = 'view-applicants?service=' + service.title;
  };

  return (
    <div className="user-service-container">
      <div className="user-service" onClick={handleBackgroundClick}>

        <div className="option-container-service">
          <div className="user-link-container">
            <a className="user-link relative-container" href={`view-applicants?service=${service.title}`}>
              <Notifications notifications={notifications ? notifications.length : 0} />
              <i className="fa-solid fa-users fa-2x"></i>
            </a>
            <a className="user-service-text" href={`view-applicants?service=${service.title}`}>
              {service.title}
            </a>
          </div>

          <div className="edit-delete-container">
            <a className="edit-button" href={`edit-service?service=${service.title}`}
            >Edit</a>
            <button className="service-delete-button"
              onClick={(event) => {
                event.stopPropagation(); // Prevent event bubbling
                // window.location.href = 'https://www.youtube.com/watch?v=oHC1230OpOg'
                setDeleteServiceTitle(service.title);
                setIsShowingServiceDeletePopup(true);
              }}
            >Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MyServicesHome() {
  // create the information required to display the page
  const [services, setServices] = useState([]);
  const [username, setUsername] = useState('no username associated with token')
  const [isShowingServiceDeletePopup, setIsShowingServiceDeletePopup] = useState(false);
  const [deleteServiceTitle, setDeleteServiceTitle] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        var token = localStorage.getItem('token');
        if (token) {
          console.log('sending request');
          const response = await fetch('http://localhost:3000/get-user-services',
            {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            })
            .then(response => response.json())
            .then(data => {
              // 'data' variable will contain the received object with the data array and tokenUsername

              setServices(data.dataServices);
              setUsername(data.tokenUsername);
              const loaderWrapper = document.querySelector(".loader-wrapper");
              loaderWrapper.style.transition = "opacity 0.5s";
              loaderWrapper.style.opacity = "0";
              setTimeout(() => {
                loaderWrapper.style.display = "none";
              }, 500); // fade out duration in milliseconds
            })
        }
        else {
          console.log('no token found')
        }
      } catch (error) {
        console.log(error)
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log('services: ', services);
  }, [services]);

  return (
    <div>
      <div className="loader-wrapper">
        <span className="loader"><span className="loader-inner"></span></span>
      </div>
      <NavBar isFixedPage={false} />,
      <DeleteServicePopup isShowingServiceDeletePopup={isShowingServiceDeletePopup} serviceTitle={deleteServiceTitle} />
      <div
        id='login-popup-background'
        className={isShowingServiceDeletePopup ? '' : 'hidden'}
        onClick={() => setIsShowingServiceDeletePopup(false)}
        style={{ cursor: 'pointer' }}
      >
      </div>
      <div className="username-title">
        {"Welcome " + username}
      </div>
      <div className="user-service-container">
        <div className="user-service">
          <a className="background-link" href="/categories-page"></a>
          <a className="user-link" href="/categories-page">
            <div className="option-container">
              <i className="fa-solid fa-plus fa-2x"></i>
              <p className="user-service-text">Add a New Service</p>
            </div>
          </a>
        </div>
      </div>
      {services.map(service => ( // display each service
        <MyServicePageDisplay
          key={service._id}
          service={service} />
      ))}
    </div >
  )
}

export default MyServicesHome;