import React, { useEffect, useState } from 'react';
import { BASE_BACKEND_URL } from '../../config';

function User(props) {
    user = props.user;

    return (
        <button className='flex'>
            <img src={user.profileImage}
                alt="photos-optimized/user-pic.png" />
            <div className='flex flex-col'>
                <h1>{user.username}</h1>
                <div className='text-[#465985]'>
                    <p>{user.username}</p>
                    <p>{user.gmail}</p>
                </div>
            </div>
        </button>
    )
}

export default function UserSelectionMenu() {
    const [users, setUsers] = useState([]);

    useEffect(async function () {
        try {
            const response =
                await fetch(`${BASE_BACKEND_URL}/userdata/get_all_users`);
            const data = await response.json();
            setUsers(data.users);
        } catch (error) {
            console.log(error);
        }
    }, [])

    return (
        <div className='flex flex-col'>
            <div>

            </div>
            {users.map((user) => {
                <User user={user} />
            })}
        </div>
    )
} 