import React from "react";

function EntityManagementButton(props) {
  const entity = props.entity;

  return (
    <div
      className={`relative text-white px-4 py-2 border-black border-b-2
      ${props.isSelected ? "bg-[#2C6BAC]" : ""}`}
    >
      <button
        className="bg-[#ECAA1E] absolute right-4 top-[50%] translate-y-[-50%]"
        onClick={props.OnSettingsClick}
      >
        <img src="/Photos/Setting_fill.png" className=" max-h-[100%] " />
      </button>
      <button
        className="flex gap-8 w-[100%] h-[100%]"
        onClick={() => {
          props.SelectEntity(props.entireEntity);
        }}
      >
        <img className="w-[82px]" src={entity.image} />
        <div className="flex flex-col">
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
  console.log("entites: ", props.entities);
  if (props.entityType == "user") {
    return (
      <div>
        {props.entities.map((user) => {
          return (
            <EntityManagementButton
              entity={{
                image: user.profile,
                name: user.fullName,
                subtext: [user.email],
              }}
              key={user._id}
            />
          );
        })}
      </div>
    );
  } else {
    return (
      <div>
        {props.entities.map((service) => {
          return (
            <EntityManagementButton
              entity={{
                image: service.image,
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

export default function EntityManagementSelection(props) {
  console.log(props.entities);
  return (
    <div className="bg-[#00468D] h-[100%]">
      <div className="border-b-2 border-black">
        <button className="w-[10%]">Back</button>
        <div className="w-[90%] bg-transparent">
          <input placeholder="Search" type="search" />
          <img src="Photos/search.png" alt="" />
        </div>
      </div>
      <div>
        <EntityList
          SelectEntity={props.SelectEntity}
          entityType={props.entityType}
          entities={props.entities}
          selectedId={props.selectedId}
        />
      </div>
    </div>
  );
}
