import React from 'react';
import { Fragment } from 'react';

import classes from '../MainScreen.module.css';
import { Divider } from 'antd';
import ScreenLayout from '../../Layout/ScreenLayout';
import FinancialAssets from '../../components/FinanscialAssets/FinancialAssets';
import MonthIncome from '../../components/MonthIncome/MonthIncome';
import Column from '../../Layout/Column';

import Authentication from '../../components/Authentication/Authenctication';

const MainScreen = () => {
  return(
      <Fragment>
          <div className={classes.mainScreenContainer}>
              <ScreenLayout
                  leftContent={
                      <Column>
                          <Authentication />
                          <Divider>Assets</Divider>
                          <FinancialAssets/>
                      </Column>
                  }
                  rightContent={
                      <Column>
                          <Divider>Month income</Divider>
                          <MonthIncome />
                      </Column>
                  } />
          </div>
      </Fragment>
  );
}

export default MainScreen;
