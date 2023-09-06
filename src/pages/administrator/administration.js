import React, { useState, useEffect } from 'react';
import UserManagement from './userManagement';
import UserSelectionMenu from './userSelectionMenu';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';

export default function Administration() {

    useEffect(() => {
        document.title = "Manage Members and Send Updates | Community ALI";
      }, []);
    const [selectedUser, setSelectedUser] = useState();

    return(
        <div>
            <NavBar />
            <div className='flex mt-28 h-[80vh] relative'>
            <a id="tech-support" className='absolute bottom-10 left-5' href="/contact-form"> Technical Support </a>
                <UserSelectionMenu setSelectedUser={setSelectedUser}/>
                <UserManagement />
            </div>
        </div>
    )
}