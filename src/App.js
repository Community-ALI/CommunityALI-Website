import React from 'react';
import UserPool from ".UserPool";
import { Discovery } from 'aws-sdk';
import Signup from "./components/Signup";
import Login from "./components/Login";
import { Account } from './components/Account';

const App = () => {
    return(
        <Account>
            <Signup />
            <Login />
        </Account>
    );
};

export default App;