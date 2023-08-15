import React, { Component, useState, useEffect } from "react";
import {BASE_BACKEND_URL} from '../../config.js'
import './main-page.css';
import '../../../public/stylesheets/style.css'
import '../../components/loading-screen.css'
import NavBar from '../../components/NavBar';
import Notifications from "../../components/Notification";
import DeleteServicePopup from '../../components/DeleteServicePopup'
const Buffer = require('buffer').Buffer;
// create the information required to display the page

function MyServicePageDisplay(props) {
  const [notifications, setNotifications] = useState([]);
  const service = props.service;
  // const buffer = Buffer.from(service.thumbnail.data);
  // const base64 = buffer.toString('base64');
  // const imageUrl = `data:image/png;base64,${base64}`;

  useEffect(() => 
  {
    document.title = 'Manage Services | Community ALI';
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await fetch(`${BASE_BACKEND_URL}/servicedata/get-service-notifications?service=` + service.title,
            {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            })
            .then(response => response.json())
            .then(data => {
              // 'data' variable will contain the received object with the data array and tokenUsername
              setNotifications(data);
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


  const handleBackgroundClick = () => {
    window.location.href = 'view-applicants?service=' + service.title;
  };

  return (
    <div className="user-service-container">
      <div className="flex items-center w-[80%] my-[20px] mx-[15px] text-white rounded-[20px] bg-[color:var(--secondary-color)] transition duration-300 ease-out hover:bg-[color:var(--dark-secondary-color)]" id={service.title} onClick={handleBackgroundClick} >
        <img className="w-[230px] rounded-[20px]" src="photos-optimized/WebsiteVideoPlaceholder-opt.webp"/>
        <div className="flex justify-between w-[100%] px-[30px]">
          <div className="text-white text-[24px] font-medium  text-center overflow-hidden overflow-ellipsis max-w-[500px] w-[100%]">{service.title}</div>
          <Notifications notifications={notifications ? notifications.length : 0} />
          <div className="flex items-center">
            <a href={`edit-service?service=${service.title}`}>
              <img className='h-[50px] mr-[30px]' src="photos/EditIcon.png"></img>
            </a>
            <a href={`view-applicants?service=${service.title}`}>
              <img className='h-[50px] mr-[10px]' src="photos/ApplicantsIcon.png"></img>
            </a>
            <button className="service-delete-button"
              onClick={(event) => {
                event.stopPropagation();
                props.setDeleteServiceTitle(service.title);
                props.setIsShowingServiceDeletePopup(true);
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
  const [username, setUsername] = useState('no username associated with token');
  const [isShowingServiceDeletePopup, setIsShowingServiceDeletePopup] = useState(false);
  const [deleteServiceTitle, setDeleteServiceTitle] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        var token = localStorage.getItem('token');
        if (token) {
          const response = await fetch(`${BASE_BACKEND_URL}/userdata/get-user-services`,
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

  return (
    <>
      <div className="loader-wrapper">
        <span className="loader"><span className="loader-inner"></span></span>
      </div>
      <NavBar isFixedPage={false} />,

      <div className='flex justify-center'>
          <div className={'max-w-[1600px] w-[90%] flex flex-col px-[25px]'}>
              <div className='flex flex-col gap-3'>
                  <div className="flex flex-row justify-between gap-3">
                      <button className='blue-container px-[15px]'>&lt;&lt; BACK</button>
                      <div className='flex gap-3'>
                        <button className='blue-container px-[25px]'>Filter</button>
                      </div>
                  </div>
                  <div className="flex justify-end gap-3">
                      <a className='blue-container px-[24px] py-[10px]' href="/categories-page"> Create a New Service + </a>
                  </div>
              
              </div>
              <div className='flex flex-col items-center'>
                  <div className='w-[100%] mb-5'>
                      <div className="text-white font-medium text-[24px] ml-8 mb-[5px]"> {"Services Owned By " + username} </div>
                      <hr/>
                  </div>
              </div>
          </div>
       </div>

      <DeleteServicePopup isShowingServiceDeletePopup={isShowingServiceDeletePopup} serviceTitle={deleteServiceTitle} />
      <div
        id='login-popup-background'
        className={isShowingServiceDeletePopup ? '' : 'hidden'}
        onClick={() => setIsShowingServiceDeletePopup(false)}
        style={{ cursor: 'pointer' }}
      >
      </div>

      {services.length === 0 ? (  // Wanted to Add a Condition if Services Array is Empty
        <div></div>
      ) : (
        services.map((service) => (
          <MyServicePageDisplay
            key={service._id}
            service={service}
            setDeleteServiceTitle={setDeleteServiceTitle}
            setIsShowingServiceDeletePopup={setIsShowingServiceDeletePopup}
          />
        ))
      )}
    </>
  )
}

export default MyServicesHome;