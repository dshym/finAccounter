import React from 'react';
import classes from './Profile.module.css';
import { useDispatch } from 'react-redux';
import * as authActions from '../../store/actions/auth';
import * as assetsActions from '../../store/actions/assets';
import * as incomeActions from '../../store/actions/income';
import * as tranactionActions from '../../store/actions/transactions';
import * as investmentsActions from '../../store/actions/investments';

import SaveButton from '../SaveButton/SaveButton';
import {Button} from "antd";



const Profile = () => {
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(authActions.logout());
        dispatch(assetsActions.setCountries([]));
        dispatch(incomeActions.setIncomes([]));
        dispatch(tranactionActions.setTransactions({incomeTransactions: [], outcomeTransactions: []}));
        dispatch(investmentsActions.setInvestments({}));
    }

  return(
      <div className={classes.profileContainer}>
          Profile
          <Button onClick={logoutHandler} >Log out</Button>
          <SaveButton/>
      </div>
  );
}

export default Profile;
