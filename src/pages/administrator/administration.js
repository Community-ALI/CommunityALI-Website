import React, { useState, useEffect } from "react";
import UserManagement from "./userManagement";
import UserSelectionMenu from "./userSelectionMenu";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { BASE_BACKEND_URL } from "../../config";

export default function Administration() {
  const [selectedUser, setSelectedUser] = useState();
  const [users, setUsers] = useState([]);

  const convertImageToUrl = async function (image) {
    try {
      const buffer = Buffer.from(image.data);
      const base64 = buffer.toString("base64");
      return `data:image/png;base64,${base64}`;
    } catch (err) {
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
    <div>
      <NavBar />
      <div className="flex mt-28 lrr:mt-0 h-[80vh] relative">
        <UserSelectionMenu users={users} SetSelectedUser={setSelectedUser} />
        <UserManagement />
      </div>
      <Footer />
    </div>
  );
}
