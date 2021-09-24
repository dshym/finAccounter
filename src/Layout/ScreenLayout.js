import React from 'react';
import classes from './ScreenLayout.module.css';
import { Row, Col } from 'antd';

const ScreenLayout = (props) => {
  return(
      <Row className={classes.container}>
        <Col span={12}>{props.leftContent}</Col>
        <Col span={12}>{props.rightContent}</Col>
      </Row>
  );
}

export default ScreenLayout;