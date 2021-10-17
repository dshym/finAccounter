import React from 'react';

import { useSelector } from 'react-redux';


import AuthForm from './AuthForm';
import Profile from '../Profile/Profile';

const Authenctication = () => {

    const userDataStore = useSelector(state => state.auth);

  return(
      <div>
          {userDataStore.userId === null && <p>Log in or sing up to enable saving data</p>}
          {userDataStore.userId === null ? <AuthForm/> : <Profile/>}
      </div>
  );
}

export default Authenctication;
