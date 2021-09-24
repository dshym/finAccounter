import React from 'react';
import 'antd/dist/antd.css';
import classes from './Navigation.module.css';

import { Breadcrumb } from 'antd';

const Navigation = () => {
  return (
      <Breadcrumb className={classes.navContainer}>
        <Breadcrumb.Item className={classes.navText}>Main</Breadcrumb.Item>
        <Breadcrumb.Item className={classes.navText}>
          Statisctics
        </Breadcrumb.Item>
        <Breadcrumb.Item className={classes.navText}>
          Investments
        </Breadcrumb.Item>
      </Breadcrumb>
  );
}

export default Navigation;