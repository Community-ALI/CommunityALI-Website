import React, { useEffect, useState, useRef } from "react";
import NavBar from "../../components/NavBar";
import EntityManagementSelection from "../../components/messager/entityManagementSelection";
import MemberPopup from "./memberPopup";
import MessagingUI from "../../components/messager/messagingUI";
import Footer from "../../components/Footer";
import { Buffer } from "buffer";
import { BASE_BACKEND_URL } from "../../config";
import NavbarMobileHidden from "../../components/navbar/navbar-mobile-hidden.js";

//TODO make a get function for a fully populated service
export default function MemberManagement() {
  const [isShowingMemberPopup, setIsShowingMemberPopup] = useState(false);
  const [selectedMember, setSelectedMember] = useState({});
  const [service, setService] = useState({ title: "Loading..." });
  const [users, setUsers] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 850);

  useEffect(() => {
    document.title = "Manage Members and Send Updates | Community ALI";
  }, []);

  useEffect(() => {
    function updateWindow() {
      setIsMobile(window.innerWidth <= 850);
    }

    window.addEventListener("resize", updateWindow);

    return () => window.removeEventListener("resize", updateWindow);
  }, [window.innerWidth]);

  const showMemberPopup = function (Member) {
    setIsShowingMemberPopup(true);
    setSelectedMember(Member);
  };

  const convertImageToUrl = async function (image) {
    try {
      const buffer = Buffer.from(image.data);
      const base64 = buffer.toString("base64");
      return `data:image/png;base64,${base64}`;
    } catch (err) {
      console.log(err);
      console.error("no profile image, using default");
      return "photos-optimized/user-pic.png";
    }
  };

  async function verifyUser(_id, username) {
    try {
      console.log("Verifying user ", username, " for service ", _id);
      const response = await fetch(`${BASE_BACKEND_URL}/api/services/${_id}`);
      const data = await response.json();
      console.log(data.user + " " + username);
      if (response.status !== 200) {
        throw new Error(
          "failed to fetch service: " +
            response.status +
            " " +
            response.statusText
        );
      }
      if (data.user === username) {
        return true;
      } else {
        throw new Error("user is not the owner of the service");
      }
    } catch (error) {
      console.error(error);
      alert("You are not the owner of this service");
      return false;
    }
  }

  const getServiceIdFromUrl = () => {
    const queryString = window.location.search;
    const queryParams = new URLSearchParams(queryString);
    return queryParams.get("service");
  };

  const getUsernameFromLocalStorage = () => {
    let userName = localStorage.getItem("username");
    if (!userName) {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        userName = decodedToken.username;
        if (userName) {
          localStorage.setItem("username", userName);
        }
      }
    }
    return userName;
  };

  const fetchservice_id = async (serviceId) => {
    const response = await fetch(
      `${BASE_BACKEND_URL}/api/services/${serviceId}`
    );
    if (!response.ok) throw new Error("Failed to fetch service title");
    const data = await response.json();
    return data.title;
  };

  const fetchServiceData = async (service_id) => {
    const response = await fetch(
      `${BASE_BACKEND_URL}/servicedata/get-one-service?service=${service_id}`
    );
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
  };

  const fetchServiceMembers = async (service_id) => {
    const response = await fetch(
      `${BASE_BACKEND_URL}/servicedata/get-service-members/${service_id}`
    );
    if (!response.ok) throw new Error("Failed to fetch service members");
    return response.json();
  };

  const fetchData = async () => {
    try {
      console.log("Fetching service data");

      const serviceId = getServiceIdFromUrl();
      const userName = getUsernameFromLocalStorage();

      if (!userName) {
        alert(
          "You are not logged in or token is corrupted, try logging in or contact support"
        );
        return;
      }

      const service_id = await fetchservice_id(serviceId);
      const isVerified = await verifyUser(serviceId, userName);

      if (!isVerified) {
        return;
      }

      const serviceData = await fetchServiceData(service_id);
      const imageUrl = await convertImageToUrl(serviceData.thumbnail);
      const service = {
        ...serviceData,
        ["thumbnail"]: imageUrl,
      };
      setService(service);

      const serviceMembers = await fetchServiceMembers(service_id);

      if (!serviceMembers) {
        throw new Error("Failed to fetch service members");
      }

      const users = await Promise.all(
        serviceMembers.map(async (user) => {
          const imageUrl = await convertImageToUrl(user.profileImage);
          return { ...user, ["profileImage"]: imageUrl };
        })
      );
      setUsers(users);
    } catch (error) {
      console.error(`Fetch error: ${error}`);
    }

    const loaderWrapper = document.querySelector(".loader-wrapper");
    loaderWrapper.style.transition = "opacity 0.5s";
    loaderWrapper.style.opacity = "0";
    setTimeout(() => {
      loaderWrapper.style.display = "none";
    }, 500);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [showEntityManagement, setShowEntityManagement] = useState(false);

  return (
    <div
      className={`max-h-[100vh] overflow-hidden bg-ali-darkblue ${
        isMobile ? "bg-ali-darkblue" : ""
      }`}
    >
      <div className="loader-wrapper">
        <span className="loader">
          <span className="loader-inner"></span>
        </span>
      </div>
      {isMobile ? (
        !showEntityManagement ? (
          <>
            <NavBar hideMobileSearchBar={true} />
            <div className="lr:pt-[3rem] h-[100vh] flex">
              <MessagingUI
                service_id={service._id}
                senderId={service._id}
                canSendMessages={true}
                serviceImage={service.thumbnail}
                isMobile={true}
                BackMobileButton={() => setShowEntityManagement(true)}
              />
            </div>
          </>
        ) : (
          <>
            <NavbarMobileHidden />
            <div className="h-[100vh] w-[100%] flex">
              <EntityManagementSelection
                entityType={"user"}
                entities={users}
                isMobile={true}
                SelectEntity={showMemberPopup}
                BackMobileButton={() => setShowEntityManagement(false)}
              />
            </div>
          </>
        )
      ) : (
        <>
          <NavBar />
          <div className="lr:mt-24 h-[90vh] flex relative">
            {/* <a
              id="tech-support"
              className="absolute bottom-10 left-5 z-50"
              href="/contact-form"
            >
              Technical Support
            </a> */}
            <div className="max-w-[40%]">
              <EntityManagementSelection
                entityType={"user"}
                entities={users}
                isMobile={false}
                SelectEntity={showMemberPopup}
                selectedId={selectedMember._id}
              />
            </div>
            <MessagingUI
              service_id={service._id}
              senderId={service._id}
              canSendMessages={true}
              serviceImage={service.thumbnail}
              isMobile={false}
              BackMobileButton={() => setShowEntityManagement()}
            />
          </div>
        </>
      )}

      {/* the member popup */}
      <MemberPopup
        selectedMember={selectedMember}
        isShowingMemberPopup={isShowingMemberPopup}
        setIsShowingMemberPopup={setIsShowingMemberPopup}
      ></MemberPopup>
      <div
        className={isShowingMemberPopup ? "" : "hidden"}
        onClick={() => {
          setIsShowingMemberPopup(false);
        }}
        style={{ cursor: "pointer" }}
      ></div>
    </div>
  );
}
