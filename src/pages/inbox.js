import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import EntityManagementSelection from "../components/messager/entityManagementSelection";
import MessagingUI from "../components/messager/messagingUI";
import Footer from "../components/Footer";
import { Buffer } from "buffer";
import { BASE_BACKEND_URL } from "../config";
import LoadingUI from "../components/loading/LoadingUI";

function SelectServiceView() {
  return (
    <div className="bg-[#00468D] flex flex-col h-[100%] justify-center items-center">
      <img src="Photos/selectUser.png" alt="" />
      <p className="text-[#002347]">Select a message to view</p>
    </div>
  );
}

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

export default function Inbox() {
  const [user, setUser] = useState();
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState();
  const [showServices, setShowServices] = useState(true);

  useEffect(() => 
  {
    document.title = 'Inbox | Community ALI';
  }, []);

  const fetchServicesUserIsMember = async function (userId) {
    try {
      setShowServices(false);
      await fetch(
        `${BASE_BACKEND_URL}/userdata/get_services_user_is_member/${userId}`
      )
        .then((response) => response.json())
        .then(async (data) => {
          setShowServices(true);
          try {
            const services = await Promise.all(
              data.map(async (service) => {
                try {
                  const imageUrl = await convertImageToUrl(service.thumbnail);
                  return {
                    ...service,
                    ["thumbnail"]: imageUrl,
                  };
                } catch (err) {
                  console.log(err);
                }
              })
            );
            setServices(services);
          } catch (err) {
            console.log(err);
          }
        });
    } catch (error) {
      console.error("Failed to fetch services user is a member of", error);
    }
  };

  const fetchUser = async function () {
    try {
      const token = localStorage.getItem("token");
      await fetch(`${BASE_BACKEND_URL}/userdata/get-account`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const userAccount = data.dataAccount[0];
          console.log(userAccount);
          setUser(userAccount);
          fetchServicesUserIsMember(userAccount._id);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await fetch(`${BASE_BACKEND_URL}/userdata/get-username`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            fetchUser(data);
          });
      }
    } catch (error) {
      console.error("failed to fetch user account", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 850);

  useEffect(() => {
    console.log("window width: ", window.innerWidth);
    function updateWindow() {
      setIsMobile(window.innerWidth <= 850);
    }

    window.addEventListener("resize", updateWindow);

    return () => window.removeEventListener("resize", updateWindow);
  }, [window.innerWidth]);

  if (isMobile) {
    if (selectedService) {
      return (
        <div>
          <NavBar hideMobileSearchBar={true}/>
          <div className="lr:mt-[66px] sm:mt-[0px] h-[100vh] flex overflow-hidden">
            <MessagingUI
              serviceTitle={selectedService.title}
              senderId={selectedService._id}
              serviceImage={selectedService.thumbnail}
              BackMobileButton={() => setSelectedService(null)}
              isMobile={true}
            />
          </div>
        </div>
      );
    }
    return (
      <div className="max-h-[100vh] overflow-hidden">
        <NavBar hideMobileSearchBar={true} />
        <div className="lr:mt-[66px] h-[100vh] flex relative">
          <EntityManagementSelection
            entityType={"service"}
            entities={services}
            SelectEntity={setSelectedService}
            selectedId={selectedService ? selectedService._id : false}
            canSendMessages={false}
            showServices={showServices}
            SetShowServices={setShowServices}
          />
            {!showServices && (
              <div className="absolute bottom-[55%] right-[46%]">
                <LoadingUI />
              </div>
            )}
            {/* <a id="tech-support" className='absolute bottom-[15%] left-[40vw] z-10' href="/contact-form"> Technical Support </a> */}
        </div>
      </div>
    );
  }

  return (
    <div className="max-h-[100vh] overflow-hidden bg-ali-darkblue">
      <NavBar/>
      <div className="lr:mt-24 h-[90vh] flex relative">
        <a id="tech-support" className='absolute bottom-[5%] left-7 z-10' href="/contact-form"> Technical Support </a>
        <div className="max-w-[35%] flex-1 relative xlr:max-w-[40%]">
          <EntityManagementSelection
            entityType={"service"}
            entities={services}
            SelectEntity={setSelectedService}
            selectedId={selectedService ? selectedService._id : false}
            canSendMessages={false}
            showServices={showServices}
            SetShowServices={setShowServices}
          />
          {!showServices && (
            <div className="absolute bottom-[50%] right-[50%]">
              <LoadingUI />
            </div>
          )}
        </div>
        {selectedService && (
          <MessagingUI
            serviceTitle={selectedService.title}
            senderId={selectedService._id}
            serviceImage={selectedService.thumbnail}
          />
        )}
        {!selectedService && (
          <div className="flex-1">
            <SelectServiceView />
          </div>
        )}
      </div>
    </div>
  );
}
