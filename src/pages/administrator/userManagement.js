import React from 'react';

export default function UserManagement(props) {
    user = props.user;

    return(
        <div>
            <div></div>
            <div>
                <div>
                    <div>
                        <p>{`Username: ${user.username}`}</p>
                        <p>{`Email: ${user.email}`}</p>
                    </div>
                    <Link></Link>
                </div>
                <div>
                    <img src="" alt="photos-optimized/user-pic.png" />
                    <h1>user.fullName</h1>
                </div>
                <button>Manage Permissions</button>
            </div>
            <div>{`${user.fullName} is a part of the following Services:`}</div>
            <div>
                
            </div>
        </div>
    )
}