import React, { useState, useEffect } from "react";
import UserManagement from "./userManagement";
import UserSelectionMenu from "./userSelectionMenu";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { BASE_BACKEND_URL } from "../../config";

export default function Administration() {
  const [selectedUser, setSelectedUser] = useState();
  const [users, setUsers] = useState([]);

  var token = localStorage.getItem("token");
  var decodedToken = {};
  if (token) {
    decodedToken = JSON.parse(atob(token.split(".")[1]));
    console.log(decodedToken);
  }

  const convertImageToUrl = async function (image) {
    try {
      const buffer = Buffer.from(image.data);
      const base64 = buffer.toString("base64");
      return `data:image/png;base64,${base64}`;
    } catch (err) {
      console.log("no profile image, using default");
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
if (decodedToken.administrator) {
  return (
    <div>
      <NavBar />
      <div className="flex mt-28 lrr:mt-0 h-[80vh] relative">
        <UserSelectionMenu users={users} SetSelectedUser={setSelectedUser} />
        <UserManagement user={selectedUser} />
      </div>
      <Footer />
    </div>
  );}
  else {
    return (
      <div>
        <NavBar />
        <div className="flex justify-center h-[80vh] mt-28 items-center text-white font-bold"><h1>YOU DO NOT HAVE <span className="text-ali-orange">AUTHORIZATION</span> FOR THIS PAGE... sorry</h1> </div>
      </div>
    )
  }
}
