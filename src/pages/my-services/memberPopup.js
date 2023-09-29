import React, { useState, useEffect, useRef } from "react";
import { BASE_BACKEND_URL } from "../../config.js";
import { set } from "mongoose";

export default function MemberPopup(props) {
  function ToggleButton({ isSelected, update }) {
    console.log("editor: ", isEditorSelected);
    return (
      <label className="toggleLabel">
        <input
          className="toggleInput"
          type="checkbox"
          checked={isSelected}
          onChange={update}
        />
        <div className="toggleButton"></div>
      </label>
    );
  }

  const [isEditorSelected, setIsEditorSelected] = useState(false);
  const [isManagerSelected, setIsManagerSelected] = useState(false);
  const [isSendUpdatesSelected, setIsSendUpdatesSelected] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 850);

  const member = props.selectedMember;

  const closePopup = () => {
    console.log(isEditorSelected, isManagerSelected, isSendUpdatesSelected);
    updateMemberPermissions(); // update the member's permissions
    props.setIsShowingMemberPopup(false); // close the popup
    setAreButtonsVisible(true);
    setIsManagePermissionsVisible(false);
  };

  // update the member's permissions when the user navigates away from the page
  useEffect(() => {
    window.addEventListener("beforeunload", updateMemberPermissions);
    return () => {
      window.removeEventListener("beforeunload", updateMemberPermissions);
    };
  }, [isEditorSelected, isManagerSelected, isSendUpdatesSelected, member]);

  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        closePopup();
      }
    };

    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [
    closePopup,
    isEditorSelected,
    isManagerSelected,
    isSendUpdatesSelected,
    member,
  ]);

  // get the member's permissions
  useEffect(() => {
    const token = localStorage.getItem("token");
    const query = new URLSearchParams(window.location.search);
    const service = query.get("service");
    const getMemberPermissions = async function () {
      const response = await fetch(
        `${BASE_BACKEND_URL}/servicedata/get-member-permissions?service=${service}`,
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: member._id,
          }),
        }
      );
      const data = await response.json();
      setIsEditorSelected(data.isEditor);
      setIsManagerSelected(data.isManager);
      setIsSendUpdatesSelected(data.isUpdateSender);
    };
    getMemberPermissions();
  }, [props.isShowingMemberPopup]);

  const updateMemberPermissions = async function () {
    // Make the member an editor or application manager
    const token = localStorage.getItem("token");
    const query = new URLSearchParams(window.location.search);
    const service = query.get("service");
    const response = await fetch(
      `${BASE_BACKEND_URL}/servicedata/assign-member-permissions?service=${service}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isEditor: isEditorSelected,
          isManager: isManagerSelected,
          isUpdateSender: isSendUpdatesSelected,
          user_id: member._id,
        }),
      }
    );
  };
  


  const [isManagePermissionsVisible, setIsManagePermissionsVisible] =
    useState(false);
  const [areButtonsVisible, setAreButtonsVisible] = useState(true);

  const [popupYPosition, setPopupYPosition] = useState(0);
  const popupHeight = 443.5;
  const [maxYPosition, setMaxYPosition] = useState(
    window.innerHeight - popupHeight
  );

  useEffect(() => {
    console.log(props.selectedMember);
    if (props.selectedMember._id) {
      const y = document
        .getElementById(props.selectedMember._id)
        .getBoundingClientRect().y;
      setPopupYPosition(y > maxYPosition ? maxYPosition : y);
    }
  }, [props.selectedMember._id]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setMaxYPosition(window.innerHeight - popupHeight);
    });
    window.addEventListener("scroll", () => {
      setMaxYPosition(window.innerHeight - popupHeight);
    });

    return () => {
      window.removeEventListener("resize", () => {
        setMaxYPosition(window.innerHeight - popupHeight);
      });
      window.removeEventListener("scroll", () => {
        setMaxYPosition(window.innerHeight - popupHeight);
      });
    };
  });

  if (props.isShowingMemberPopup) {
    return (
      <>
        <div
          className="fixed top-0 left-0 w-[100%] h-[100%] 
        bg-black opacity-50 z-[99] xlrr:hidden"
        ></div>

        {/* <div className="w-[100vw] h-[100vh] flex justify-center items-center fixed z-[101] top-0 right-0">
          <div className="w-[100px] h-[100px] bg-red-500"></div>
        </div> */}

        <div className="lr:w-[100vw] lr:h-[100vh] flex justify-center fixed z-[101] top-0 right-0 w-0 h-0">
          <div
            ref={popupRef}
            className={`left-[380px] w-[380px] z-[100] shadow-xl rounded-[15px] fadeInFast h-0 lr:mt-[160px] sm:mt-[140px] xlrr:fixed
            lr:animate-none lr:scale-[1.0] md:scale-[0.9] sm:scale-[0.8] xsm:scale-[0.7] flex-shrink-0`}
            style={
              !isMobile ? { top: `${popupYPosition}px` } : { top: "140px" }
            }
          >
            <i
              className="fa-solid fa-xmark text-white absolute top-2 right-3 cursor-pointer"
              onClick={closePopup}
            ></i>
            <div className="absolute w-[85px] h-[85px] top-[15px] left-[24px] rounded-full overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={member.profileImage}
                alt="Member Profile"
              />
            </div>
            <div className="bg-ali-backgroundblue pt-4 pb-3 pl-[125px] flex justify-start rounded-t-[15px]">
              <h1 className="text-white text-[20px]">{member.fullName}</h1>
            </div>
            <div className="bg-[#001A52] text-white rounded-b-[15px] pb-4">
              <div className="pl-[125px] pb-[40px] pt-2 text-[13px]">
                <p> {member.email}</p>
              </div>

              {areButtonsVisible && (
                <div className="flex justify-evenly fadeInFast mt-4">
                  <button
                    className="text-[14px] px-3 py-2 bg-ali-orange text-ali-darkblue font-[500] rounded-[10px] 
                            hover:bg-ali-lightblue hover:text-white transition duration-[300ms] ease-in-out"
                    onClick={() => {
                      setIsManagePermissionsVisible(
                        !isManagePermissionsVisible
                      );
                      setAreButtonsVisible(false);
                    }}
                  >
                    Manage Permissions
                  </button>
                  <button
                    className="text-[14px] px-3 py-2 bg-ali-lightblue text-white font-[500] rounded-[10px]
                            border-2 border-ali-backgroundblue hover:bg-ali-darkblue transition duration-[300ms] ease-in-out"
                  >
                    Kick Member
                  </button>
                </div>
              )}

              {isManagePermissionsVisible && (
                <div className="px-7 fadeInFast">
                  <div className="mb-5">
                    <button
                      className="text-[13px]"
                      onClick={() => {
                        setAreButtonsVisible(true);
                        setIsManagePermissionsVisible(
                          !isManagePermissionsVisible
                        );
                      }}
                    >
                      &lt;- Back
                    </button>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between">
                      <h1 className="mb-1">Edit Service</h1>
                      <ToggleButton
                        isSelected={isEditorSelected}
                        update={() => setIsEditorSelected(!isEditorSelected)}
                      />
                    </div>
                    <p className="text-[14px] opacity-60">
                      {" "}
                      &#40;Allows members to edit all aspects of the service
                      except deletion&#41;{" "}
                    </p>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between">
                      <h1 className="mb-1">Manage Applicants/Members</h1>
                      <ToggleButton
                        isSelected={isManagerSelected}
                        update={() => setIsManagerSelected(!isManagerSelected)}
                      />
                    </div>
                    <p className="text-[14px] opacity-60">
                      {" "}
                      &#40;Allows members to view, accept, deny applicants, and
                      kick members&#41;{" "}
                    </p>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between">
                      <h1 className="mb-1">Send Updates</h1>
                      <ToggleButton
                        isSelected={isSendUpdatesSelected}
                        update={() =>
                          setIsSendUpdatesSelected(!isSendUpdatesSelected)
                        }
                      />
                    </div>
                    <p className="text-[14px] opacity-60">
                      {" "}
                      &#40;Allows members to send update messages to all the
                      members&#41;{" "}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }

  return null;
}
