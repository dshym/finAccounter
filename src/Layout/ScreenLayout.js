import React from 'react';

import { Row, Col } from 'antd';

const ScreenLayout = (props) => {
  return(
      <Row>
        <Col span={12}>{props.leftContent}</Col>
        <Col span={12}>{props.rightContent}</Col>
      </Row>
  );
}

export default ScreenLayout;