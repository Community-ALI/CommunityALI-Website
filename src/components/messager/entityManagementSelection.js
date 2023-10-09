import React, { useState, useEffect } from "react";
import Notifications from "../Notification";
import { BASE_BACKEND_URL } from "../../config";

function EntityManagementButton(props) {
  const entity = props.entity;
  const [notifications, setNotifications] = useState([]);

  if (!entity.isUser) {
    useEffect(() => {
      const fetchNotifications = async () => {
        try {
          var token = localStorage.getItem("token");
          var decodedToken = {};
          if (token) {
            decodedToken = JSON.parse(atob(token.split(".")[1]));
            console.log(decodedToken);
          }
          if (decodedToken._id) {
            await fetch(
              `${BASE_BACKEND_URL}/api/messages/${entity._id}/${decodedToken._id}`
            )
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                if (data.error) {
                  console.error(data.error);
                } else {
                  console.log(`Fetched ${data.length} many messages`);
                  setNotifications(data);
                }
              });
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchNotifications();
    }, []);
  }

  async function clearNotificationsForService() {
    try {
      console.log("CLEARING NOTIFICATIONS");
      var token = localStorage.getItem("token");
      var decodedToken = {};
      if (token) {
        decodedToken = JSON.parse(atob(token.split(".")[1]));
      }
      if (decodedToken._id) {
        const user = await fetch(
          `${BASE_BACKEND_URL}/api/users/${decodedToken._id}`
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data.error) {
              console.error(data.error);
            } else {
              console.log("Successfully fetched user");
              return data;
            }
          });

          console.log("USER: ", user);
        const newUserUncheckedMessages = user.uncheckedMessages.filter(
          (message) => {
            return notifications.some(
              (notification) => notification._id != message
            );
          }
        );
        console.log("USER UNCHECKED MESSAGES: ", newUserUncheckedMessages);

        const newUser = {
          uncheckedMessages: newUserUncheckedMessages,
        };

        console.log("NOTIFICATIONS: ", notifications);
        console.log("NEW USER: ", newUser);
        
        await fetch(`${BASE_BACKEND_URL}/api/users/${decodedToken._id}`, {
          method: "PUT",
          body: JSON.stringify(newUser),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data.error) {
              console.error(data.error);
            } else {
              console.log("Successfully cleared notifications");
              setNotifications(0);
            }
          });
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div
      id={entity._id}
      className={`relative max-h-[101px] text-white px-4 py-4 border-ali-darkblue border-b-2 border-opacity-50 fadeIn
      ${props.isSelected ? "bg-[#2C6BAC]" : ""}`}
    >
      <button
        className="flex gap-4 items-center w-[100%] h-[100%]"
        disabled={props.SelectEntity === undefined}
        onClick={() => {
          if (props.SelectEntity !== undefined) {
            props.SelectEntity(props.entireEntity);
            if (!entity.isUser) {
              clearNotificationsForService();
            }
          }
        }}
      >
        <img
          className={`w-[90px] lr:w-[70px] ${
            entity.isUser ? "rounded-full" : "rounded-lg"
          }`}
          src={entity.image}
        />
        <div className="flex flex-col text-left xlr:text-[14px] lr:text-[16px] sm:text-[14px]">
          <h1 className="relative pr-2">
            {entity.name}
            {!entity.isUser && (
              <Notifications notifications={notifications.length} />
            )}
          </h1>
          <div className="text-[#465985]">
            <div className="text-white text-[14px] sm:text-[12px]">
              {entity.subtext}
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}

function EntityList(props) {
  if (props.entityType == "user") {
    return (
      <div
        className="flex flex-col overflow-scroll overflow-x-hidden overflow-y-auto h-[100%] min-w-[380px] lr:h-auto
      border-r-2  border-ali-backgroundblue border-opacity-50 lr:border-r-0 pb-[100px] lr:pb-[50px]"
      >
        {props.entities.map((user) => {
          return (
            <EntityManagementButton
              SelectEntity={props.SelectEntity}
              entireEntity={user}
              entity={{
                image: user.profileImage
                  ? user.profileImage
                  : "/Photos/UserTemplateImage.png",
                name: user.fullName,
                subtext: [],
                isUser: true,
                _id: user._id,
              }}
              key={user._id}
              isSelected={props.selectedId === user._id}
            />
          );
        })}
      </div>
    );
  } else {
    return (
      <div
        className="flex flex-col overflow-scroll overflow-x-hidden overflow-y-auto h-[100%] lr:h-auto
      border-r-2  border-ali-backgroundblue border-opacity-50 white lr:border-r-0"
      >
        {props.entities.map((service) => {
          return (
            <EntityManagementButton
              entity={{
                image: service.thumbnail
                  ? service.thumbnail
                  : "/Photos/DefaultServiceImage.png",
                name: service.title,
                subtext: [],
                _id: service._id,
              }}
              entireEntity={service}
              isSelected={props.selectedId === service._id}
              key={service._id}
              SelectEntity={props.SelectEntity}
            />
          );
        })}
      </div>
    );
  }
}

// TODO: implement searchbar
export default function EntityManagementSelection(props) {
  const handleBackClick = () => {
    if (!props.isMobile || props.BackMobileButton === undefined) {
      window.history.back();
    } else {
      props.BackMobileButton();
    }
  };

  return (
    <div className="bg-[#00468D] h-[100%] w-[100%] relative overflow-x-hidden overflow-y-hidden lr:overflow-y-scroll">
      <div
        className="border-b-2 border-r-2 border-r-ali-backgroundblue border-opacity-50
       border-y-ali-darkblue lr:border-r-0 lr:mt-[70px]"
      >
        <button
          className="text-white px-6 py-5 border-ali-darkblue"
          onClick={handleBackClick}
        >
          &lt;&lt; Back
        </button>
        {/* <div className="w-[90%] bg-transparent">
          <input placeholder="Search" type="search" />
          <img src="Photos/search.png" alt="" />
        </div> */}
      </div>

      <EntityList
        SelectEntity={props.SelectEntity}
        entityType={props.entityType}
        entities={props.entities}
        selectedId={props.selectedId}
      />
    </div>
  );
}
