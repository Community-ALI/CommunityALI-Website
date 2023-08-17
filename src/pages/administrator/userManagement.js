import React from 'react';

export default function UserManagement(props) {

    if (props.user) {
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
    } else {
        return (
            <div className='w-[60%] h-[100%] flex flex-col'>
                <div className='h-8 bg-white'></div>

                <div className='flex flex-col items-center justify-center bg-[#C5C5C5] h-[]'>
                    <img src="/Photos/selectUser.png" alt="" />
                    <p>Select an Account to Manage</p>
                </div>
            </div>
        )
    }
}