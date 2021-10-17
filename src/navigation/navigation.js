import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'antd/dist/antd.css';
import classes from './Navigation.module.css';
import {Menu} from 'antd';
import CurrenciesTable from "../components/currencies/CurrenciesTable";
import Authenctication from "../components/Authentication/Authenctication";

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
              <Authenctication/>
          </div>
      </React.Fragment>
  );
}

export default Navigation;
