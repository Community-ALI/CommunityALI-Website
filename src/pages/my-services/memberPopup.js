import React, { useState, useEffect } from 'react';
import { BASE_BACKEND_URL } from '../../config.js';

function ToggleButton({ isSelected, onClick }) {
    return (
      <label className='toggleLabel'>
        <input
          className='toggleInput'
          type="checkbox"
          checked={isSelected}
          onChange={onClick}
        />
        <div className="toggleButton"></div>
      </label>
    );
  }

function MemberPopup(props) {
    const member = props.selectedMember;

    // Step 1: Create state variables
    const [isEditorSelected, setIsEditorSelected] = useState(false);
    const [isManagerSelected, setIsManagerSelected] = useState(false);
    const [isSendUpdatesSelected, setIsSendUpdatesSelected] = useState(false);

    const [isManagePermissionsVisible, setIsManagePermissionsVisible] = useState(false);
    const [areButtonsVisible, setAreButtonsVisible] = useState(true);

    // Step 2: Update the updateMemberRole function
    const updateMemberRole = async function () {
        // Make the member an editor or application manager
        const token = localStorage.getItem('token');
        const query = new URLSearchParams(window.location.search);
        const service = query.get('service');
        const response = await fetch(`${BASE_BACKEND_URL}/servicedata/assign-user-role?service=${service}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                isEditor: isEditorSelected,
                isManager: isManagerSelected,
                isSendUpdates: isSendUpdatesSelected,
                user_id: member._id
              }),
        });
        // Handle the response here if needed
    }

    if (props.isShowingMemberPopup) {
        return (
            <div className='top-[15%] left-[335px] w-[380px] z-100 shadow-xl fixed rounded-[15px] fadeInFast'>
                <img className="absolute w-[85px] top-[15px] left-[24px]" src='photos-optimized/user-pic.png' />
                <div className='bg-ali-backgroundblue pt-4 pb-3 pl-[125px] flex justify-start rounded-t-[15px]'>
                    <h1 className='text-white text-[20px]'>{member.fullName}</h1>
                </div>
                <div className='bg-[#001A52] text-white rounded-b-[15px] pb-4'>
                    <div className='pl-[125px] pb-[40px] pt-2 text-[13px]'>
                        <p> benjamin964837@my.yosemite.edu</p>
                    </div>
                

                {areButtonsVisible && (
                    <div className='flex justify-evenly fadeInFast mt-4'>
                        <button
                            className='text-[14px] px-3 py-2 bg-ali-orange text-ali-darkblue font-[500] rounded-[10px] 
                            hover:bg-ali-lightblue hover:text-white transition duration-[300ms] ease-in-out'
                            onClick={() => {
                            setIsManagePermissionsVisible(!isManagePermissionsVisible);
                            setAreButtonsVisible(false); 
                            }}
                        >
                            Manage Permissions
                        </button>
                        <button
                            className='text-[14px] px-3 py-2 bg-ali-lightblue text-white font-[500] rounded-[10px]
                            border-2 border-ali-backgroundblue hover:bg-ali-darkblue transition duration-[300ms] ease-in-out'>
                            Kick Member
                        </button>
                    </div>
                )}

                {isManagePermissionsVisible && (
                    <div className='px-7 fadeInFast'>
                        <div className='mb-5'>
                            <button className='text-[13px]'
                            onClick={() => {
                                setAreButtonsVisible(true); 
                                setIsManagePermissionsVisible(!isManagePermissionsVisible);
                            }}
                            >&lt;- Back</button>
                        </div>
                    <div className='mb-4'>
                        <div className='flex justify-between'>
                        <h1 className='mb-1'>Edit Service</h1>
                        <ToggleButton
                            isSelected={isEditorSelected}
                            onClick={() => setIsEditorSelected(!isEditorSelected)}
                        />
                        </div>
                        <p className='text-[14px] opacity-60'> &#40;Allows members to edit all aspects of the service except deletion&#41; </p>
                    </div>
                    <div className='mb-4'>
                        <div className='flex justify-between'>
                        <h1 className='mb-1'>Manage Applicants/Members</h1>
                        <ToggleButton
                            isSelected={isManagerSelected}
                            onClick={() => setIsManagerSelected(!isManagerSelected)}
                        />
                        </div>
                        <p className='text-[14px] opacity-60'> &#40;Allows members to view, accept, deny applicants, and kick members&#41; </p>
                    </div>
                    <div className='mb-4'>
                        <div className='flex justify-between'>
                        <h1 className='mb-1'>Send Updates</h1>
                        <ToggleButton
                            isSelected={isSendUpdatesSelected}
                            onClick={() => setIsSendUpdatesSelected(!isSendUpdatesSelected)}
                        />
                        </div>
                        <p className='text-[14px] opacity-60'> &#40;Allows members to send update messages to all the members&#41; </p>
                    </div>
                    </div>
                )}

                </div>
            </div>
        );
    }

    return null;
}

export default MemberPopup;
