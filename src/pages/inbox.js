import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import EntityManagementSelection from "../components/messager/entityManagementSelection";
import MessagingUI from "../components/messager/messagingUI";
import Footer from "../components/Footer";
import { BASE_BACKEND_URL } from "../config";

function SelectServiceView() {
    return(<div className="bg-[#00468D] flex flex-col h-[100%] justify-center items-center">
        <img src="Photos/selectUser.png" alt="" />
        <p className="text-[#002347]">Select a message to view</p>
    </div>)
}

export default function Inbox() {
  const [user, setUser] = useState();
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState();

  const fetchServicesUserIsMember = async function (userId) {
    try {
      await fetch(
        `${BASE_BACKEND_URL}/userdata/get_services_user_is_member/${userId}`
      )
        .then((response) => response.json())
        .then((data) => {
          setServices(data);
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

  //TODO: link selected service to messaging ui to display that
  // service's messages
  return (
    <div>
      <NavBar />
      <div className="lr:mt-24 h-[80vh] flex">
        <div className="max-w-[40%] flex-1">
          <EntityManagementSelection
            entityType={"service"}
            entities={services}
            SelectEntity={setSelectedService}
            selectedId={(selectedService) ? selectedService._id : false}
          />
        </div>
        {selectedService && 
          <MessagingUI
            serviceTitle={selectedService.title}
            senderId={selectedService._id}
          />
        }
        {!selectedService && 
            <div className="flex-1">
                <SelectServiceView />
            </div>
        }
      </div>
      <Footer />
    </div>
  );
}
