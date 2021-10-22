import React, {useCallback, useEffect} from 'react';

import { useSelector } from 'react-redux';

import AuthForm from './AuthForm';
import Profile from '../Profile/Profile';
import {openNotificationWithIcon} from '../CustomNotification/CustomNotification';

const Authenctication = () => {

    const userDataStore = useSelector(state => state.auth);

    useEffect(() => {
        if(userDataStore.authError) {
            openNotificationWithIcon('error', userDataStore.authError, 'An error accured');
        }

    }, [userDataStore.authError]);

  return(
      <div>
          {userDataStore.userId === null && <p>Log in or sing up to enable saving data</p>}
          {userDataStore.userId === null ? <AuthForm/> : <Profile/>}
      </div>
  );
}

export default Authenctication;
