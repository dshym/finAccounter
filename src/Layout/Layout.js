import React from 'react';
import 'antd/dist/antd.css';
import Navigation from '../navigation/navigation';
import { Layout } from 'antd';

const { Header, Content } = Layout;

const MainLayout = (props) => {
    return (
        <Layout>
            {props.children}
            <Content>
                {props.mainContent}
            </Content>
        </Layout>
    );
}

export default MainLayout;