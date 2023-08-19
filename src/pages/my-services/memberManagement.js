import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import EntityManagementSelection from "../../components/messager/entityManagementSelection";
import MessagingUI from "../../components/messager/messagingUI";
import Footer from "../../components/Footer";
import { BASE_BACKEND_URL } from "../../config";

//TODO make a get function for a fully populated service
export default function MemberManagement() {
  const [service, setService] = useState();
  const [users, setUsers] = useState([]);

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
          console.log(data);
          setService(data);
          await fetch(
            `${BASE_BACKEND_URL}/servicedata/get-service-members/${serviceTitle}`
          )
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then((data) => {
              console.log(`Fetched users: ${data}`);
              setUsers(data);
            });
        });
    } catch (error) {
      console.error(`Fetch error: ${error}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //TODO: Connect backend data to elements
  return (
    <div>
      <NavBar />
      <div className="mt-24 h-[80%]">
        <EntityManagementSelection
          entityType={"user"}
          entities={users}
        />
        {/* <MessagingUI /> */}
      </div>
      {/* <Footer /> */}
    </div>
  );
}
