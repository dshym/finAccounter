import React, {useCallback, useEffect} from 'react';

import { useSelector } from 'react-redux';

import AuthForm from './AuthForm';
import Profile from '../Profile/Profile';

import { notification } from 'antd';

const Authenctication = () => {

    const userDataStore = useSelector(state => state.auth);

    useEffect(() => {
        const openNotificationWithIcon = (type, errorMessage) => {
            notification[type]({
                message: 'An error accured',
                description: `${errorMessage}`,
            });
        };
        if(userDataStore.authError) {
            console.log('error');
            openNotificationWithIcon('error', userDataStore.authError);
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
