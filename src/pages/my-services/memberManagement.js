import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import EntityManagementSelection from "../../components/messager/entityManagementSelection";
import MessagingUI from "../../components/messager/messagingUI";
import Footer from "../../components/Footer";
import { Buffer } from "buffer";
import { BASE_BACKEND_URL } from "../../config";

//TODO make a get function for a fully populated service
export default function MemberManagement() {
  const [service, setService] = useState({ title: "Loading..." });
  const [users, setUsers] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 850);

  useEffect(() => {
    console.log("window width: ", window.innerWidth);
    function updateWindow() {
      setIsMobile(window.innerWidth <= 850);
    }

    window.addEventListener("resize", updateWindow);

    return () => window.removeEventListener("resize", updateWindow);
  }, [window.innerWidth]);

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

  const fetchData = async () => {
    try {
      console.log("Fetching service data");
      const queryString = window.location.search;
      const queryParams = new URLSearchParams(queryString);
      const serviceTitle = queryParams.get("service");
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
              const loaderWrapper = document.querySelector(".loader-wrapper");
              loaderWrapper.style.transition = "opacity 0.5s";
              loaderWrapper.style.opacity = "0";
              setTimeout(() => {
                loaderWrapper.style.display = "none";
              }, 500);
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
                console.log(users);
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

  //TODO: Add page loading so users can't interact with elements
  //before all the data has been set up
  //TODO: Add mobile support
  if (isMobile) {
    if (!showEntityManagement) {
      return (
        <div>
        <NavBar />
          <div className="lr:mt-24 h-[80vh] flex">
            <MessagingUI
              serviceTitle={service.title}
              senderId={service._id}
              canSendMessages={true}
              serviceImage={service.thumbnail}
              isMobile={true}
              BackMobileButton={() => setShowEntityManagement(true)}
            />
          </div>
        <Footer />
        </div>
      );
    }

    return (
      <div>
        <NavBar />
        <div className="lr:mt-24 h-[80vh] w-[100%] flex">
            <EntityManagementSelection entityType={"user"} entities={users} isMobile={true} BackMobileButton={() => setShowEntityManagement(false)} />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <div className="lr:mt-24 h-[80vh] flex">
        {
          <div className="max-w-[40%]">
            <EntityManagementSelection entityType={"user"} entities={users} />
          </div>
        }
        <MessagingUI
          serviceTitle={service.title}
          senderId={service._id}
          canSendMessages={true}
          serviceImage={service.thumbnail}
          isMobile={false}
          BackMobileButton={() => setShowEntityManagement()}
        />
      </div>
      <Footer />
      <div className="loader-wrapper">
        <span className="loader">
          <span className="loader-inner"></span>
        </span>
      </div>
    </div>
  );
}
