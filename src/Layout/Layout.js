import React from 'react';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
const { Content } = Layout;

const MainLayout = (props) => {
    return (
        <Layout style={{background: '#EBFAFF', minHeight: window.innerHeight}}>
            {props.children}
            <Content>
                {props.mainContent}
            </Content>
        </Layout>
    );
}

export default MainLayout;
