import React from "react";
import NavBar from "../../components/NavBar";
import EntityManagementSelection from "../../components/messager/entityManagementSelection";
import MessagingUI from "../../components/messager/messagingUI";

export default function MemberManagement() {
  const service = {
    title: "Dev Service",
    users: [
      {
        fullName: "David Locke",
        email: "davylockssupportsLGTBQ@gmail.com",
        _id: 3214,
        profile: "Photos/UserTemplateImage.png",
      },
    ],
  };

  return (
    <div>
      <NavBar />
      <div className="mt-24">
        <EntityManagementSelection
          entityType={"user"}
          entities={service.users}
        />
        <MessagingUI />
      </div>
    </div>
  );
}
