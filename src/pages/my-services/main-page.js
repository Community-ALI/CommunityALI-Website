import React, { Component, useState, useEffect } from "react";
import './main-page.css';
import '../../../public/stylesheets/style.css'
import NavBar from '../../components/NavBar';
import DeleteServicePopup from '../../components/DeleteServicePopup'
// create the information required to display the page





function MyServicesHome() {

    const [services, setServices] = useState([]);
    const [username, setUsername] = useState('no username associated with token')
    const [notificaitons, setNotifications] = useState(1); // TODO connect this with backend
    const [isShowingServiceDeletePopup, setIsShowingServiceDeletePopup] = useState(false);
    const [deleteServiceTitle, setDeleteServiceTitle] = useState('');


    function MyServicePageDisplay(props) {
    
      const service = props.service;
    
      const handleBackgroundClick = () => {
        window.location.href = 'view-applicants?service='+service.title;
      };
       
      return (
        <div className="user-service" onClick={handleBackgroundClick}>
          <div 
              className={
                  ' notification-icon' + 
                  (props.notificaitons < 1) ? ' hidden' : ''
              }
          >{props.notificaitons}</div>
          <div className="option-container-service">
            <a className="user-link" href={`view-applicants?service=${service.title}`}>
              <i className="fa-solid fa-users fa-2x"></i>
            </a>
            <a className="user-service-text" href={`view-applicants?service=${service.title}`}>
              {service.title}
            </a>
            <a
              className="edit-button"
              href={`edit-service?service=${service.title}`}
            >Edit</a>
            <button
              className="service-delete-button"
              onClick={(event) => {
                event.stopPropagation(); // Prevent event bubbling
                setDeleteServiceTitle(service.title);
                setIsShowingServiceDeletePopup(true);
              }}
            >Delete</button>
          </div>
        </div>
      );
    }



    useEffect(() => {
        const fetchData = async () => {
          try {
            var token = localStorage.getItem('token');
            if (token){
                console.log('sending request');
                const response = await fetch('http://localhost:3000/get-user-services',
                    {headers: {
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
            else{
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
        </div>,
        <NavBar isFixedPage={false} notificaitons={notificaitons} />,
        <DeleteServicePopup isShowingServiceDeletePopup={isShowingServiceDeletePopup} serviceTitle={deleteServiceTitle}/>
        <div 
            id='login-popup-background' 
            className={isShowingServiceDeletePopup ? '' : 'hidden'}
            onClick={() => setIsShowingServiceDeletePopup(false)}
            style={{cursor:'pointer'}}
            >
        </div>
        <div className = "username-title">
            {"Welcome: " + username}
        </div>
        <div className = "user-service">
            <a className = "background-link" href = "/add-service"></a>
            <a className = "user-link" href = "/add-service">
                <div className = "option-container">
                    <i className = "fa-solid fa-plus fa-2x"></i>
                    <p className = "user-service-text">Add a New Service</p>
                </div> 
            </a>
        </div>
        {services.map(service => ( // display each service
            <MyServicePageDisplay 
              key={service._id} 
              service={service} 
              notificaitons={notificaitons} />
        ))}
    </div>
 )
}

export default MyServicesHome;