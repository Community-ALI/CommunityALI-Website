import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import EntityManagementSelection from "../components/messager/entityManagementSelection";
import MessagingUI from "../components/messager/messagingUI";
import Footer from "../components/Footer";
import { BASE_BACKEND_URL } from "../config";

export default function Inbox() {
  const [user, setUser] = useState();
    const [services, setServices] = useState([])

  const fetchServicesUserIsMember = async function (userId) {
    try {
      await fetch(
        `${BASE_BACKEND_URL}/userdata/get_services_user_is_member/${userId}`
      ).then((response => response.json())).then((data) => {
        setServices(data);
      })
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUser = async function () {
    try {
      await fetch(`${BASE_BACKEND_URL}/userdata/get-account`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setUser(data);
          fetchServicesUserIsMember(data._id);
        });
    } catch (error) {
      console.error("Failed to fetch services user is a member of");
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

  //TODO: feed user services into entityManagementSelection
  //TODO: link selected service to messaging ui to display that
  // service's messages
  return (
    <div>
      <NavBar />
      <div className="lr:mt-24 h-[80vh] flex">
        <div className="max-w-[40%]">
          <EntityManagementSelection entityType={"user"} entities={users} />
        </div>
        <MessagingUI serviceTitle={service.title} senderId={service._id} />
      </div>
      <Footer />
    </div>
  );
}
