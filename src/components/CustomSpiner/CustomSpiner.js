import React from 'react';

import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const CustomSpiner = () => {
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    return(
        <Spin indicator={antIcon} style={{margin: 5}} />
    );
}

export default CustomSpiner;
