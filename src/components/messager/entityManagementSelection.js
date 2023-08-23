import React, { useState, useEffect } from "react";

// TODO: Implement member management
function EntityManagementButton(props) {
  const entity = props.entity;

  //  TODO: implement settings button
  return (
    <div
      className={`relative max-h-[101px] text-white px-4 py-2 border-black border-b-2
      ${props.isSelected ? "bg-[#2C6BAC]" : ""}`}
    >
      {/* <button
        className="bg-[#ECAA1E] absolute right-4 top-[50%] translate-y-[-50%]"
        onClick={props.OnSettingsClick}
      >
        <img src="/Photos/Setting_fill.png" className=" max-h-[100%] " />
      </button> */}
      <button
        className="flex gap-4 items-center w-[100%] h-[100%]"
        onClick={() => {
          props.SelectEntity(props.entireEntity);
        }}
      >
        <img
          className={`w-[82px] ${
            entity.isUser ? "rounded-full" : "rounded-lg"
          }`}
          src={entity.image}
        />
        <div className="flex flex-col text-left">
          <h1>{entity.name}</h1>
          <div className="text-[#465985]">
            <p className="text-white">{entity.subtext}</p>
          </div>
        </div>
      </button>
    </div>
  );
}

function EntityList(props) {
  useEffect(() => {
    console.log("entites: ", props.entities);
  }, [props.entities]);

  if (props.entityType == "user") {
    return (
      <div className="flex flex-col overflow-scroll overflow-x-hidden h-[100%]">
        {props.entities.map((user) => {
          return (
            <EntityManagementButton
              entity={{
                image: user.profileImage
                  ? user.profileImage
                  : "/Photos/UserTemplateImage.png",
                name: user.fullName,
                subtext: [user.email],
                isUser: true,
              }}
              key={user._id}
            />
          );
        })}
      </div>
    );
  } else {
    return (
      <div className="flex flex-col overflow-scroll overflow-x-hidden h-[100%]">
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
  console.log(props.entities);

  const handleBackClick = () => {
    if (!props.isMobile || props.BackMobileButton === undefined) {
      window.history.back();
    } else {
      props.BackMobileButton();
    }
  };

  return (
    <div className="bg-[#00468D] h-[100%] w-[100%]">
      <div className="border-b-2 border-black">
        <button
          className="text-white p-2 border-[1px] border-black"
          onClick={handleBackClick}
        >
          Back
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
