import React from "react";

function User(props) {
  const user = props.user;

  return (
    <button className="flex border-t-2 p-2 px-3 gap-4 border-black" onClick={() => {
      props.SelectUser(user);
    }}>
      <img className="w-[82px] rounded-full" src={user.profileImage} alt="photos-optimized/user-pic.png" />
      <div className="flex flex-col">
        <h1>{user.fullName}</h1>
        <div className="text-[#465985]">
          <p>{user.username}</p>
          <p>{user.email}</p>
        </div>
      </div>
    </button>
  );
}

export default function UserSelectionMenu(props) {

  return (
    <div className="flex flex-col bg-white w-[40%]">
      <div className="flex bg-[#F5F5F5] p-1 justify-between">
        <button>Back</button>
        <input type="search" className="w-[75%]"></input>
        <button>Sort by</button>
      </div>
      {props.users.map((user) => (
        <User user={user} key={user._id} SelectUser={props.SetSelectedUser} />
      ))}
    </div>
  );
}
