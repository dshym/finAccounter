import React from 'react';

import { Switch, Route } from 'react-router-dom';

import MainScreen from '../screens/MainScreen/MainScreen'
import StatisticsScreen from '../screens/StatisticsScreen';
import InvestmentScreen from '../screens/InvestmentsScreen';
import AddTransactionScreen from "../screens/AddTransactionScreen";

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
          <Route path="/add_transaction">
              <AddTransactionScreen />
          </Route>
      </Switch>
  );
}

export default NavigationSwitch;
