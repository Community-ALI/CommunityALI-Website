import React from "react";

function EntityManagementButton() {
  entity = props.entity;

  return (
    <button className="flex" onClick={props.SelectUser}>
      <img src={entity.image} alt="photos-optimized/user-pic.png" />
      <div className="flex flex-col">
        <h1>{entity.name}</h1>
        <div className="text-[#465985]">
            <div>{entity.subtext}</div>
        </div>
      </div>
    </button>
  );
}

function EntityList(props) {
    if (props.areUsers) {
        return(
            <div className=""></div>
        )
    }
}

export default function EntityManagementSelection(props) {
  return (
    <div>
      <div>
        <button>Back</button>
        <input type="search"></input>
      </div>
      <div></div>
    </div>
  );
}
