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

  async function verifyUser(title, username) {
    try {
      console.log("Verifying user ", username, " for service ", title);
      const response = await fetch(
        `${BASE_BACKEND_URL}/api/services/${title}`
      );
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

  const fetchData = async () => {
    try {
      console.log("Fetching service data");
      const queryString = window.location.search;
      const queryParams = new URLSearchParams(queryString);
      const serviceTitle = queryParams.get("service");
      const isVarified = await verifyUser(
        serviceTitle,
        localStorage.getItem("username")
      );
      if (!isVarified) {
        return;
      }
      const response = await fetch(
        `${BASE_BACKEND_URL}/servicedata/get-one-service?service=${serviceTitle}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(async (data) => {
          try {
            const imageUrl = await convertImageToUrl(data.thumbnail);
            const service = {
              ...data,
              ["thumbnail"]: imageUrl,
            };
            setService(service);
          } catch (err) {
            console.log(err);
          }
          await fetch(
            `${BASE_BACKEND_URL}/servicedata/get-service-members/${serviceTitle}`
          )
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              try {
                const loaderWrapper = document.querySelector(".loader-wrapper");
                loaderWrapper.style.transition = "opacity 0.5s";
                loaderWrapper.style.opacity = "0";
                setTimeout(() => {
                  loaderWrapper.style.display = "none";
                }, 500);
              } catch (err) {
                console.log(err);
              }
              return response.json();
            })
            .then(async (data) => {
              try {
                console.log(`Fetched users: ${data.length}`);
                const users = await Promise.all(
                  data.map(async (user) => {
                    try {
                      const imageUrl = await convertImageToUrl(
                        user.profileImage
                      );
                      return { ...user, ["profileImage"]: imageUrl };
                    } catch (err) {
                      console.log(err);
                    }
                  })
                );
                setUsers(users);
              } catch (err) {
                console.log(err);
              }
            });
        });
    } catch (error) {
      console.error(`Fetch error: ${error}`);
    }
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
                serviceTitle={service.title}
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
            <a
              id="tech-support"
              className="absolute bottom-10 left-5 z-50"
              href="/contact-form"
            >
              Technical Support
            </a>
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
              serviceTitle={service.title}
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
