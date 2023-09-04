import React, { useState } from 'react';
import { BASE_BACKEND_URL } from '../../config.js';

function MemberPopup(props) {
    const member = props.selectedMember;

    // Step 1: Create state variables
    const [isEditorSelected, setIsEditorSelected] = useState(false);
    const [isManagerSelected, setIsManagerSelected] = useState(false);


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
            body: JSON.stringify({ isEditor: isEditorSelected, isManager: isManagerSelected, user_id: member._id }),
        });

        // Handle the response here if needed
    }

    if (props.isShowingMemberPopup) {
        return (
            <div className='container-login'>
                <div className="container-for-login">
                    <h1>{member.fullName}</h1>
                </div>

                <p>Change this user's permissions:</p>
                <label>
                    <input type="checkbox" checked={isEditorSelected} onChange={() => setIsEditorSelected(!isEditorSelected)} />
                    Editor
                </label>
                <label>
                    <input type="checkbox" checked={isManagerSelected} onChange={() => setIsManagerSelected(!isManagerSelected)} />
                    Manager
                </label>


                <button onClick={updateMemberRole}>Submit</button>

            </div>
        );
    }

    return null;
}

export default MemberPopup;
