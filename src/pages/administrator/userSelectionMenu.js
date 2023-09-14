import React, { useEffect, useState } from "react";
import { BASE_BACKEND_URL } from "../../config";

function User(props) {
  const user = props.user;

  return (
    <button className="flex border-t-2 p-2 px-3 gap-4 border-black" onClick={props.SelectUser}>
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
  const [users, setUsers] = useState([]);

  const convertImageToUrl = async function (image) {
    try {
      const buffer = Buffer.from(image.data);
      const base64 = buffer.toString("base64");
      return `data:image/png;base64,${base64}`;
    } catch (err) {
      console.log(err);
      console.error("no profile image, using default");
      return "photos-optimized/user-pic.png";
    }
  };

  async function fetchUsers() {
    try {
      console.log("fetching users");
      const response = await fetch(`${BASE_BACKEND_URL}/api/users/`);
      const data = await response.json();
      console.log(data);
      if (response.status !== 200) {
        throw new Error(
          "failed to fetch users: " +
            response.status +
            " " +
            response.statusText
        );
      }
      const users = await Promise.all(
        data.map(async (user) => {
          try {
            const imageUrl = await convertImageToUrl(user.miniProfileImage);
            return { ...user, ["profileImage"]: imageUrl };
          } catch (err) {
            console.log(err);
          }
        })
      );
      setUsers(users);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col bg-white w-[40%]">
      <div className="flex bg-[#F5F5F5] p-1 justify-between">
        <button>Back</button>
        <input type="search" className="w-[75%]"></input>
        <button>Sort by</button>
      </div>
      {users.map((user) => (
        <User user={user} SelectUser={props.SetSelectedUser} />
      ))}
    </div>
  );
}
