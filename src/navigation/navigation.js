import React from 'react';
import { NavLink } from 'react-router-dom';

import 'antd/dist/antd.css';
import classes from './Navigation.module.css';

import { Menu } from 'antd';

const Navigation = () => {
  return (
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
  );
}

export default Navigation;