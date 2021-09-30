import React from 'react';
import { Fragment } from 'react';

import classes from '../MainScreen.module.css';
import { Divider } from 'antd';
import ScreenLayout from '../../Layout/ScreenLayout';
import FinancialAssets from '../../components/FinanscialAssets/FinancialAssets';
import MonthIncome from '../../components/MonthIncome/MonthIncome';
import Form from '../../components/Form/Form';

import Column from '../../Layout/Column';

const MainScreen = () => {
  return(
      <Fragment>
          <div className={classes.mainScreenContainer}>
              <ScreenLayout
                  leftContent={
                      <Column>
                          <Divider>Assets</Divider>
                          <FinancialAssets/>
                          <Divider>Month income</Divider>
                          <MonthIncome />
                      </Column>
                  }
                  rightContent={
                      <Column>
                          <Divider>Add transaction</Divider>
                          <Form />
                      </Column>
                  } />
          </div>
      </Fragment>
  );
}

export default MainScreen;