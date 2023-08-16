import React, { useState } from 'react';
import UserManagement from './userManagement';
import UserSelectionMenu from './userSelectionMenu';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';

export default function Administration() {
    const [selectedUser, setSelectedUser] = useState();
    return(
        <div>
            <NavBar />
            <div className='flex mt-28 h-[80vh]'>
                <UserSelectionMenu setSelectedUser={setSelectedUser}/>
                <UserManagement />
            </div>
            <Footer />
        </div>
    )
}