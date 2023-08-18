import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import EntityManagementSelection from "../../components/messager/entityManagementSelection";
import MessagingUI from "../../components/messager/messagingUI";
import { BASE_BACKEND_URL } from "../../config";

export default function MemberManagement() {
  const [service, setService] = useState();

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
        } catch (error) {
          console.error(`Fetch error: ${error}`);
        }
      }
  );
  
  //TODO: Fetch all the user accounts that are members of this service

  return (
    <div>
      <NavBar />
      <div className="mt-24">
        <EntityManagementSelection
          entityType={"user"}
          entities={service.users}
        />
        {/* <MessagingUI /> */}
      </div>
    </div>
  );
}
