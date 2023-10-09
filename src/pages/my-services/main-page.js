import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BASE_BACKEND_URL } from "../../config.js";
import "../../../public/stylesheets/style.css";
import "../../components/loading-screen.css";
import NavBar from "../../components/NavBar";
import Notifications from "../../components/Notification";
import DeleteServicePopup from "../../components/DeleteServicePopup";
import LoadingUI from "../../components/loading/LoadingUI.js";
const Buffer = require("buffer").Buffer;
// create the information required to display the page

function MyServicePageDisplay(props) {
  const [notifications, setNotifications] = useState([]);
  const service = props.service;
  const buffer = Buffer.from(service.thumbnail.data);
  const base64 = buffer.toString("base64");
  const imageUrl = `data:image/png;base64,${base64}`;

  useEffect(() => {
    document.title = "Manage Services | Community ALI";
  }, []);

  if (
    service.permissions.includes("Owner") ||
    service.permissions.includes("Manager")
  ) {
    useEffect(() => {
      const fetchData = async () => {
        try {
          const token = localStorage.getItem("token");
          if (token) {
            const response = await fetch(
              `${BASE_BACKEND_URL}/servicedata/get-service-notifications?service=` +
                service.title,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
              .then((response) => response.json())
              .then((data) => {
                // 'data' variable will contain the received object with the data array and tokenUsername
                setNotifications(data);
              });
          } else {
            console.log("no token found");
          }
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    }, []);
  }

  const handleBackgroundClick = () => {
    if (
      service.permissions.includes("Owner") ||
      service.permissions.includes("Manager")
    ) {
      window.location.href = "view-applicants?service=" + service.title;
    } else {
      window.location.href = "service-info?service=" + service.title;
    }
  };

  return (
    <div className="flex content-center justify-center fadeIn px-[5%] lr:flex-col lr:items-center sm:mb-[30px]">
      <div
        className="flex items-center w-[80%] my-[20px] mx-[15px] max-w-[1200px] text-white rounded-[20px] bg-[color:var(--secondary-color)] transition 
        duration-300 ease-out hover:bg-[color:var(--dark-secondary-color)] cursor-pointer xxlr:w-[86%] lr:w-[92%] md:w-[95%]"
        id={service.title}
        onClick={handleBackgroundClick}
      >
        <img
          className="w-[210px] rounded-[20px] xlr:w-[180px] lr:w-[160px] sm:w-[130px] xsm:w-[100px]"
          src={imageUrl}
        />
        <div className="flex justify-between w-[100%] px-[30px] xlr:px-[20px] md:flex-col md:px-[10px] md:py-[10px]">
          <div
            className="text-white text-[140%] xxlr:text-[120%] xlr:text-[110%] lr:text-[100%] xlr:items-center font-medium text-left overflow-hidden 
          overflow-ellipsis w-[60%] xxlr:text-start xxlr:max-w-[400px] xlr:max-w-[300px] md:w-[100%] md:text-center md:line-clamp-2 sm:text-[85%] xsm:text-[70%]"
          >
            {service.title}
          </div>
          <div className="flex items-center flex-wrap lr:justify-end md:justify-center md:mt-[10px] sm:hidden">
            {(service.permissions.includes("Owner") ||
              service.permissions.includes("Editor")) && (
              <a href={`edit-service?service=${service.title}`}>
                <img
                  className="h-[50px] w-[50px] mr-[30px] xlr:h-[40px] xlr:w-[40px] lr:h-[35px] lr:w-[35px] md:h-[30px] md:w-[30px] transition duration-300 ease-out hover:scale-[1.1]"
                  src="Photos/EditIcon.png"
                ></img>
              </a>
            )}

            {(service.permissions.includes("Owner") ||
              service.permissions.includes("Manager")) && (
              <a
                className="relative"
                href={`view-applicants?service=${service.title}`}
              >
                <Notifications
                  notifications={notifications ? notifications.length : 0}
                />
                <img
                  className="h-[50px] w-[50px] mr-[10px] xlr:h-[40px] xlr:w-[40px] xxlr:mr-[0px] lr:h-[35px] lr:w-[35px] md:h-[30px] md:w-[30px] transition duration-300 ease-out hover:scale-[1.1]"
                  src="Photos/ApplicantsIcon.png"
                />
              </a>
            )}

            {/* {service.permissionLevel === "Owner" && (
                <a  onClick={(event) => {
                  event.stopPropagation();
                  props.setDeleteServiceTitle(service.title);
                  props.setIsShowingServiceDeletePopup(true);
                  }}>
                <img className='h-[50px] w-[50px]  xlr:h-[40px] xlr:w-[40px] lr:w-[30px] lr:h-[30px] transition duration-300 ease-out hover:scale-[1.1]' src="photos/TrashIcon.png"></img>
              </a>
              )} */}
          </div>
        </div>
      </div>

      <div
        className="flex items-center content-center flex-wrap text-center justify-center max-w-[300px] text-[130%] font-[600] w-[25%] mx-[15px] p-[15px] text-white 
        rounded-[20px] bg-[color:var(--secondary-color)] transition duration-300 ease-out hover:bg-[color:var(--dark-secondary-color)] cursor-pointer xxlr:text-[120%] lr:max-w-[1000px]
        xlr:text-[100%] lr:text-[90%] lr:p-[10px] lr:w-[85%] md:w-[95%] mdd:hidden sm:p-[5px]"
      >
        <a href={`edit-service?service=${service.title}`}>
          <img
            src="Photos/EditIcon.png"
            className="h-[50px] w-[50px] mr-[30px] xlr:h-[40px] xlr:w-[40px] lr:h-[35px] lr:w-[35px] md:h-[30px] md:w-[30px] sm:mx-[20px] transition duration-300 ease-out hover:scale-[1.1]"
          ></img>
        </a>
        <a
          className="relative"
          href={`view-applicants?service=${service.title}`}
        >
          <Notifications
            notifications={notifications ? notifications.length : 0}
          />
          <img
            src="Photos/ApplicantsIcon.png"
            className="h-[50px] w-[50px] mr-[30px] xlr:h-[40px] xlr:w-[40px] xxlr:mr-[0px] lr:h-[35px] lr:w-[35px] md:h-[30px] md:w-[30px] sm:mx-[20px] transition duration-300 ease-out hover:scale-[1.1]"
          ></img>
        </a>
        <a href={`view-applicants?service=${service.title}`}>
          <img
            className="h-[50px] w-[50px] mr-[30px] xlr:h-[40px] xlr:w-[40px] xxlr:mr-[0px] lr:h-[35px] lr:w-[35px] md:h-[30px] md:w-[30px] sm:mx-[20px] transition duration-300 ease-out hover:scale-[1.1]"
            src="Photos/SendIcon.png"
          ></img>
        </a>
      </div>
      {service.permissions.includes("Owner") ||
    service.permissions.includes("UpdateSender")? (
        <Link
          className="flex items-center content-center flex-wrap text-center justify-center max-w-[300px] text-[130%] font-[600] w-[25%] my-[20px] mx-[15px] p-[15px] text-white 
        rounded-[20px] bg-[color:var(--secondary-color)] transition duration-300 ease-out hover:bg-[color:var(--dark-secondary-color)] cursor-pointer xxlr:text-[120%] lr:max-w-[1000px]
        xlr:text-[100%] lr:text-[90%] lr:p-[10px] lr:w-[85%] md:w-[95%] sm:text-[80%] xsm:text-[80%] sm:hidden"
          to={`/member-management?service=${service._id}`}
        >
          <p>
            {" "}
            Manage{" "}
            <span className="text-[var(--accent-color)] text-[110%]">
              {" "}
              Members{" "}
            </span>{" "}
            and Send{" "}
            <span className="text-[var(--accent-color)] text-[110%]">
              {" "}
              Updates{" "}
            </span>{" "}
          </p>
        </Link>
      ) : (
        // otherwise this user cannot manage service members
        <div
          className="flex items-center content-center flex-wrap text-center justify-center max-w-[300px] text-[130%] font-[600] w-[25%] my-[20px] mx-[15px] p-[15px] text-white rounded-[20px] bg-[color:var(--secondary-color)] transition duration-300 ease-out  lr:max-w-[1000px] xlr:text-[100%] lr:text-[90%] lr:p-[10px] lr:w-[85%] md:w-[95%] sm:text-[80%] xsm:text-[80%] sm:hidden"
          style={{ filter: "brightness(60%)" }}
        >
          <p>
            Manage{" "}
            <span className="text-[var(--accent-color)] text-[110%]">
              {" "}
              Members{" "}
            </span>{" "}
            and Send{" "}
            <span className="text-[var(--accent-color)] text-[110%]">
              {" "}
              Updates{" "}
            </span>
          </p>
          <p className="text-xs">You are not authorized to manage members</p>
        </div>
      )}
    </div>
  );
}

function MyServicesHome() {
  // create the information required to display the page
  const [services, setServices] = useState([]);
  const [username, setUsername] = useState(
    localStorage.getItem("username") || "Username... (Loading)"
  );
  const [isShowingServiceDeletePopup, setIsShowingServiceDeletePopup] =
    useState(false);
  const [deleteServiceTitle, setDeleteServiceTitle] = useState("");

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 850);
  const [showServices, setShowServices] = useState(true);

  useEffect(() => {
    console.log("window width: ", window.innerWidth);
    function updateWindow() {
      setIsMobile(window.innerWidth <= 850);
    }

    window.addEventListener("resize", updateWindow);

    return () => window.removeEventListener("resize", updateWindow);
  }, [window.innerWidth]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setShowServices(false);
        var token = localStorage.getItem("token");
        if (token) {
          const response = await fetch(
            `${BASE_BACKEND_URL}/userdata/get-user-services`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ requestedFields: "title thumbnail" }),
            }
          )
            .then((response) => response.json())
            .then((data) => {
              // combine the three arrays into one
              const services = data.OwnedServices.concat(
                data.EditableServices
              ).concat(data.ManageableServices
              ).concat(data.UpdatableServices);
              // only keep unique services by title
              const uniqueServices = [];
              const map = new Map();
              setShowServices(true);
              for (const service of services) {
                if (!map.has(service.title)) {
                  map.set(service.title, true);
                  // record permission level for this service
                  if (
                    data.OwnedServices.find((s) => s.title === service.title)
                  ) {
                    // add owner to the permissions array
                    service.permissions = (service.permissions || []).concat(['Owner']);
                  }  
                  if (
                    data.EditableServices.find((s) => s.title === service.title)
                  ) {
                    service.permissions = (service.permissions || []).concat(['Editor']);
                  }  
                  if (
                    data.ManageableServices.find(
                      (s) => s.title === service.title
                    )
                    
                  ) {
                    service.permissions = (service.permissions || []).concat(['Manager']);
                  }
                  if (
                    data.UpdatableServices.find(
                      (s) => s.title === service.title
                    )
                    
                  ) {
                    service.permissions = (service.permissions || []).concat(['UpdateSender']);
                  }
                  uniqueServices.push(service);
                }
              }

              setServices(uniqueServices);
              setUsername(data.tokenUsername);
            });
        } else {
          console.log("no token found");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {isMobile ? (
        <NavBar isFixedPage={false} hideMobileSearchBar={true} />
      ) : (
        <NavBar isFixedPage={false} />
      )}
      <div className="flex justify-center lr:mt-[100px]">
        <div
          className={
            "max-w-[1600px] w-[90%] flex flex-col px-[25px] sm:px-[10px]"
          }
        >
          <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-between gap-3 pt-[20px] md:flex-col md:pt-0">
              <button
                className="blue-container px-[15px]"
                onClick={() => {
                  window.location.href = "/";
                }}
              >
                &lt;&lt; BACK
              </button>
              <button className="blue-container flex justify-center gap-3">
                <a className="px-[24px]" href="/categories-page">
                  {" "}
                  Create a New Service +{" "}
                </a>
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-[100%] mb-5">
              <div
                className="text-white font-medium text-[28px] ml-8 mb-[10px] mt-[40px] lr:text-[22px] 
                      sm:text-[18px] md:text-center md:ml-0"
              >
                {" "}
                {"Services Owned By " + username}{" "}
              </div>
              <hr className="border-[1.5px]" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <DeleteServicePopup
          isShowingServiceDeletePopup={isShowingServiceDeletePopup}
          serviceTitle={deleteServiceTitle}
        />
        <div
          id="login-popup-background"
          className={isShowingServiceDeletePopup ? "" : "hidden"}
          onClick={() => setIsShowingServiceDeletePopup(false)}
          style={{ cursor: "pointer" }}
        ></div>
      </div>
      {services.length === 0 ? ( // Wanted to Add a Condition if Services Array is Empty
        <div></div>
      ) : (
        services.map((service) => (
          <MyServicePageDisplay
            key={service._id}
            service={service}
            setDeleteServiceTitle={setDeleteServiceTitle}
            setIsShowingServiceDeletePopup={setIsShowingServiceDeletePopup}
            showServices={showServices}
            SetShowServices={setShowServices}
          />
        ))
      )}
      {!showServices && (
        <div className="w-[100%] h-[50vh]">
          <LoadingUI />
        </div>
      )}
    </>
  );
}

export default MyServicesHome;
