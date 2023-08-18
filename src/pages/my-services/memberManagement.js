import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import EntityManagementSelection from "../../components/messager/entityManagementSelection";
import MessagingUI from "../../components/messager/messagingUI";
import { BASE_BACKEND_URL } from "../../config";

export default function MemberManagement() {
  const [service, setService] = useState();
  const [users, setUsers] = useState([]);

  useEffect(
    () =>
      async function () {
        try {
          const queryString = window.location.search;
          const queryParams = new URLSearchParams(queryString);
          const serviceTitle = queryParams.get("service");
          await fetch(
            `${BASE_BACKEND_URL}/servicedata/get-one-service/${serviceTitle}`
          )
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then((data) => {
              console.log(data);
              setService(data);
            })
            .catch((error) => {
              console.error(`Fetch error: ${error}`);
            });

          await fetch(`${BASE_BACKEND_URL}/servicedata/get-service-members`)
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
            
        } catch (error) {
          console.error(`Fetch error: ${error}`);
        }
      }
  );

  return (
    <div>
      <NavBar />
      <div className="mt-24">
        <EntityManagementSelection
          entityType={"user"}
          entities={service.users}
        />
        <MessagingUI />
      </div>
    </div>
  );
}
