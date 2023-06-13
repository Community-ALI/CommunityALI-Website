import React, { useRef, Component, useEffect, useState } from 'react';

function Profile()
{
    return(
        <div className="profile-page">
            <div className="profile-info">
                <div className="profile-picture">
                <img src="" />
                </div>
                <div className="profile-details">
                <div> Name </div>
                <div> Email: </div>
                </div>
            </div>
            <div className="profile-description">
                <div>About Me</div>
                <div> description</div>
            </div>
        </div>
    )
}

export default Profile;