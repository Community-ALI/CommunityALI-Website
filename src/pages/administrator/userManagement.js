import React from "react";
import { Link } from "react-router-dom";
import ServiceDisplay from "../../components/servicesDisplay/serviceDisplay.js";

export default function UserManagement(props) {
  if (props.user !== undefined) {
    console.log(props.user);
    const user = props.user;
    return (
      <div className="flex-grow flex flex-col relative max-w-[70%]">
        <div className="h-8 bg-white"></div>
        <div className="flex p-4 min-h-[201px] relative justify-between bg-[#EDEDED]">
          <div className="flex flex-col justify-between items-start">
            <div>
              <p>{`Username: ${user.username}`}</p>
              <p>{`Email: ${user.email}`}</p>
            </div>
            <Link></Link>
          </div>
          <div className="flex flex-col gap-5 items-center absolute top-4 left-1/2 translate-x-[-50%]">
            <img
              className="w-[113px] rounded-full"
              src={user.profileImage}
              alt="photos-optimized/user-pic.png"
            />
            <h1 className="text-2xl text-ali-darkblue">{user.fullName}</h1>
          </div>
          <div>
            <div className="relative">
              <button className="p-4 text-ali-darkblue border rounded-xl border-black">
                Manage Permissions
              </button>
              <div className="absolute w-[332px] h-[155px] z-10 bg-slate-400 bottom-[-155px] right-0">Hello World</div>
            </div>
          </div>
        </div>
        <div className="bg-[#FFFFFF]">{`${user.fullName} is a part of the following Services:`}</div>
        <div className="bg-[#D9D9D9] flex-grow overflow-y-scroll">
          <ServiceDisplay startingfilter={"all"} userFilter={user.username} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-[70%] h-[100%] flex flex-col">
        <div className="h-8 bg-white"></div>

        <div className="flex flex-col items-center justify-center bg-[#C5C5C5] flex-grow">
          <img src="/Photos/selectUser.png" alt="" />
          <p>Select an Account to Manage</p>
        </div>
      </div>
    );
  }
}
