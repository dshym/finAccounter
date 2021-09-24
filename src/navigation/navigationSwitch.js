import React from 'react';

import { Switch, Route } from 'react-router-dom';

import MainScreen from '../screens/MainScreen'
import StatisticsScreen from '../screens/StatisticsScreen';
import InvestmentScreen from '../screens/InvestmentsScreen';

const NavigationSwitch = () => {
  return(
      <Switch>
          <Route path="/" exact>
              <MainScreen/>
          </Route>
          <Route path="/statistics">
              <StatisticsScreen/>
          </Route>
          <Route path="/investments">
              <InvestmentScreen/>
          </Route>
      </Switch>
  );
}

export default NavigationSwitch;