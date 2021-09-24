import React from 'react';
import { Fragment } from 'react';

import classes from './MainScreen.module.css';

import ScreenLayout from '../Layout/ScreenLayout';

const MainScreen = () => {
  return(
      <Fragment>
          <div className={classes.mainScreenContainer}>
              <ScreenLayout  leftContent={<>left</>} rightContent={<>right</>} />
          </div>
      </Fragment>
  );
}

export default MainScreen;