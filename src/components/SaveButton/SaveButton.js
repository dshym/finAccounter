import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import * as firebaseActions from '../../store/actions/firebase';

import { Button } from 'antd';
import { SaveOutlined } from '@ant-design/icons';


const SaveButton = () => {
  const userData = useSelector(state => state);
  const userDataStore = useSelector(state => state.auth);
  const dispatch = useDispatch();


  const saveData = async () => {
    //localStorage.setItem('UserData', JSON.stringify(store));
    if(userDataStore.userId === null || userDataStore.token === null) {
      alert('Sign up or log in, to save data on the server');
      return;
    }

    const dataToSave = { ...userData };

    delete dataToSave.auth;
    delete dataToSave.firebase;
    dispatch(firebaseActions.saveData(userDataStore.userId, dataToSave, userDataStore.token));
  }

  return(
      <Button danger type="dashed" icon={<SaveOutlined />} onClick={saveData} >Save data</Button>
  );
}

export default SaveButton;
