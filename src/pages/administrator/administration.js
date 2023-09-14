import React, { useState, useEffect } from 'react';
import UserManagement from './userManagement';
import UserSelectionMenu from './userSelectionMenu';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';

export default function Administration() {

    const [selectedUser, setSelectedUser] = useState();

    return(
        <div>
            <NavBar />
            <div className='flex mt-28 lrr:mt-0 h-[80vh] relative'>
            <a id="tech-support" className='absolute bottom-10 left-5' href="/contact-form"> Technical Support </a>
                <UserSelectionMenu setSelectedUser={setSelectedUser}/>
                <UserManagement />
            </div>
        </div>
    )
}