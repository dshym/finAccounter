import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import * as firebaseActions from '../../store/actions/firebase';

import { Button } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import CustomSpiner from "../CustomSpiner/CustomSpiner";

const SaveButton = () => {
  const userData = useSelector(state => state);
  const userDataStore = useSelector(state => state.auth);
  const isLoading = useSelector(state => state.firebase.firebaseLoading);
  const dispatch = useDispatch();


  const saveData = async () => {
    //localStorage.setItem('UserData', JSON.stringify(store));
    // if(userDataStore.userId === null || userDataStore.token === null) {
    //   alert('Sign up or log in, to save data on the server');
    //   return;
    // }

    const dataToSave = { ...userData };

    delete dataToSave.auth;
    delete dataToSave.firebase;
    //check for data existence, if no info then change to 0, to enable creating nodes on firebase
    dataToSave.assets.countries.forEach(country => {
      if(country.assets.length === 0) {
        country.assets = 0;
      }
    });
    if(dataToSave.assets.countries.length === 0) {
      dataToSave.assets.countries = 0;
    }
    if(dataToSave.income.incomes.length === 0) {
      dataToSave.income.incomes = 0;
    }
    if(dataToSave.transactions.incomeTransactions.length === 0) {
      dataToSave.transactions.incomeTransactions = 0;
    }
    if(dataToSave.transactions.outcomeTransactions.length === 0) {
      dataToSave.transactions.outcomeTransactions = 0;
    }
    console.log(dataToSave);
    dispatch(firebaseActions.saveData(userDataStore.userId, dataToSave, userDataStore.token));
  }

  return(
      <React.Fragment>
        {isLoading ? <CustomSpiner/> : <Button danger type="dashed" icon={<SaveOutlined />} onClick={saveData} >Save data</Button>}
      </React.Fragment>
  );
}

export default SaveButton;
