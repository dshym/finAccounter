import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import * as authActions from '../../store/actions/auth';
import {Button, Input} from 'antd';
import validator from 'validator';

import AuthForm from './AuthForm';
import Profile from '../Profile/Profile';

const Authenctication = () => {

    const userDataStore = useSelector(state => state.auth);

  return(
      <div>
          {userDataStore.userId === null ? <AuthForm/> : <Profile/>}
      </div>
  );
}

export default Authenctication;
