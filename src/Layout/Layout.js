import React from 'react';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
const { Content } = Layout;

const MainLayout = (props) => {
    return (
        <Layout style={{background: '#e9f1f7'}}>
            {props.children}
            <Content>
                {props.mainContent}
            </Content>
        </Layout>
    );
}

export default MainLayout;
