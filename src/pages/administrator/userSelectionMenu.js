import React, { useEffect, useState } from 'react';
import { BASE_BACKEND_URL } from '../../config';

function User(props) {
    user = props.user;

    return (
        <button className='flex' onClick={props.SelectUser}>
            <img src={user.profileImage}
                alt="photos-optimized/user-pic.png" />
            <div className='flex flex-col'>
                <h1>{user.fullName}</h1>
                <div className='text-[#465985]'>
                    <p>{user.username}</p>
                    <p>{user.email}</p>
                </div>
            </div>
        </button>
    )
}

export default function UserSelectionMenu(props) {
    const [users, setUsers] = useState([]);

    useEffect(() => async function () {
        try {
            const response =
                await fetch(`${BASE_BACKEND_URL}/userdata/get_all_users`);
            const data = await response.json();
            console.log(data.users);
            setUsers(data.users);
        } catch (error) {
            console.log(error);
        }
    }, [])

    return (
        <div className='flex flex-col bg-white w-[40%]'>
            <div className='flex bg-[#F5F5F5] p-1 justify-between'>
                <button>Back</button>
                <input type='search' className='w-[75%]'></input>
                <button>Sort by</button>
            </div>
            {users.map((user) => {
                <User user={user} SelectUser={props.SetSelectedUser}/>
            })}
        </div>
    )
} 