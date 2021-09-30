import React from 'react';
import { NavLink } from 'react-router-dom';

import 'antd/dist/antd.css';
import classes from './Navigation.module.css';

import { Menu } from 'antd';
import CurrenciesTable from "../components/currencies/CurrenciesTable";
const Navigation = () => {
  return (
      <div>
          <Menu mode="horizontal">
              <Menu.Item key="main">
                  <NavLink activeClassName={classes.navText} to="/">Main</NavLink>
              </Menu.Item>
              <Menu.Item key="statistics">
                  <NavLink activeClassName={classes.navText} to="/statistics">Statistics</NavLink>
              </Menu.Item>
              <Menu.Item key="investments">
                  <NavLink activeClassName={classes.navText} to="/investments">Investments</NavLink>
              </Menu.Item>

          </Menu>
          <CurrenciesTable/>
      </div>

  );
}

export default Navigation;
