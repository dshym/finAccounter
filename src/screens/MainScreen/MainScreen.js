import React from 'react';

import { Divider } from 'antd';
import ScreenLayout from '../../Layout/ScreenLayout';
import FinancialAssets from '../../components/FinanscialAssets/FinancialAssets';
import MonthIncome from '../../components/MonthIncome/MonthIncome';
import Column from '../../Layout/Column';

const MainScreen = () => {
  return(
      <div>
          <ScreenLayout
              leftContent={
                  <Column>
                      <Divider>Assets</Divider>
                      <FinancialAssets/>
                  </Column>
              }
              rightContent={
                  <Column>
                      <Divider>Month income</Divider>
                      <MonthIncome />
                  </Column>
              }
          />
      </div>
  );
}

export default MainScreen;
