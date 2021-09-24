import React from 'react';
import 'antd/dist/antd.css';

import { Layout } from 'antd';

const { Header, Content } = Layout;

const MainLayout = (props) => {
    return (
        <Layout>
            <Header>{props.headerContent}</Header>
            <Content>
                {props.mainContent}
            </Content>
        </Layout>
    );
}

export default MainLayout;