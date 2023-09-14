import React, { useState, useEffect } from "react";

function EntityManagementButton(props) {
  const entity = props.entity;

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
          <h1>{entity.name}</h1>
          <div className="text-[#465985]">
            <p className="text-white text-[14px] sm:text-[12px]">
              {entity.subtext}
            </p>
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
        className="flex flex-col overflow-scroll overflow-x-hidden overflow-y-hidden h-[100%] lr:h-auto
      border-r-2  border-ali-backgroundblue border-opacity-50 lr:border-r-0"
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
                subtext: [user.email],
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
        className="flex flex-col overflow-scroll overflow-x-hidden overflow-y-hidden h-[100%] lr:h-auto
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
    <div className="bg-[#00468D] h-[100vh] w-[100%] relative">
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
