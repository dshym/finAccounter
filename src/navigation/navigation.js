import React from 'react';
import { NavLink } from 'react-router-dom';

import 'antd/dist/antd.css';
import classes from './Navigation.module.css';
import { UserOutlined } from '@ant-design/icons';
import {Menu,Avatar} from 'antd';
import CurrenciesTable from "../components/currencies/CurrenciesTable";
import SaveButton from "../components/SaveButton/SaveButton";

const Navigation = () => {
  return (
      <React.Fragment>
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
              <Menu.Item key="addTransaction">
                  <NavLink activeClassName={classes.navText} to="/add_transaction">Add transaction</NavLink>
              </Menu.Item>
          </Menu>
          <div className={classes.container}>
              <CurrenciesTable/>
              <SaveButton />
              <Avatar shape="square" size="large" icon={<UserOutlined />} />
          </div>
      </React.Fragment>
  );
}

export default Navigation;
