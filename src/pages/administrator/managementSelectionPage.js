import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import NavBar from '../../components/NavBar';

export default function ManagementSelectionPage() {
    const [username, setUsername] = useState('No Username Found');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            console.log(token);
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            setUsername(decodedToken.username);
        }
    }, [])

    return (
        <div>
            <NavBar />
            <div className='flex flex-col items-center mx-[10vw]'>
                <div className='dark-blue-container w-[100%] h-[89px] md:mt-32
                                flex flex-col justify-center'>
                    <h1 className='text-3xl'>{`Welcome ${username}`}</h1>
                </div>
                <div className='flex flex-wrap justify-center'>
                    <Link className='flex m-8 hoverable-blue-container' 
                        to='/administation'>
                            <div className='flex flex-col items-center
                            w-[341px] px-[50px] py-8 gap-3'>
                                <img src='/Photos/admin.png'/>
                                <h1 className='dark-blue-container w-[100%] text-2xl'
                                    >Administration</h1>
                                <p>Manage member accounts and permissions</p>
                        </div>
                    </Link>
                    <Link className='flex m-8 hoverable-blue-container'
                        to='/my-services'>
                            <div className='flex flex-col items-center
                            w-[341px] px-[50px] py-8 gap-3'>
                                <img src='/Photos/myServices.png'/>
                                <h1 className='dark-blue-container w-[100%] text-2xl'
                                    >My Services</h1>
                                <p>Manage services, view applicants,
                                    and send updates to members</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}