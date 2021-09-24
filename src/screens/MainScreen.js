import React from 'react';
import { Fragment } from 'react';

import classes from './MainScreen.module.css';
import ScreenLayout from '../Layout/ScreenLayout';
import FinancialAssets from '../components/FinanscialAssets/FinancialAssets';

const MainScreen = () => {
  return(
      <Fragment>
          <div className={classes.mainScreenContainer}>
              <ScreenLayout  leftContent={<><FinancialAssets/></>} rightContent={<><FinancialAssets/></>} />
          </div>
      </Fragment>
  );
}

export default MainScreen;