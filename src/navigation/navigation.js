import React from 'react';
import { NavLink } from 'react-router-dom';

import 'antd/dist/antd.css';
import classes from './Navigation.module.css';

import { Breadcrumb, Menu } from 'antd';

const Navigation = () => {
  return (
      <Menu mode="horizontal">
          <Menu.Item>
              <NavLink activeClassName={classes.navText} to="/">Main</NavLink>
          </Menu.Item>
          <Menu.Item>
              <NavLink activeClassName={classes.navText} to="/statistics">Statistics</NavLink>
          </Menu.Item>
          <Menu.Item>
              <NavLink activeClassName={classes.navText} to="/investments">Investments</NavLink>
          </Menu.Item>
      </Menu>
      // <Breadcrumb className={classes.navContainer}>
      //   <Breadcrumb.Item>
      //       <NavLink activeClassName={classes.navText} to="/">Main</NavLink>
      //   </Breadcrumb.Item>
      //   <Breadcrumb.Item>
      //     <NavLink activeClassName={classes.navText} to="/statistics">Statistics</NavLink>
      //   </Breadcrumb.Item>
      //   <Breadcrumb.Item>
      //     <NavLink activeClassName={classes.navText} to="/investments">Investments</NavLink>
      //   </Breadcrumb.Item>
      // </Breadcrumb>
  );
}

export default Navigation;