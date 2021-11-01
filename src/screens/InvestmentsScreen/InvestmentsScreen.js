import React from 'react';

import { Divider } from 'antd';
import ScreenLayout from '../../Layout/ScreenLayout';
import InvestmentsTable from "../../components/InvestmentsTable/InvestmentsTable";
import Column from '../../Layout/Column';

import TimelineChart from "../../components/TimelineChart/TimelineChart";

const InvestmentsScreen = () => {
    return(
        <ScreenLayout leftContent={
            <Column>
                <Divider>Investments</Divider>
                <InvestmentsTable/>
            </Column>
        }
        rightContent={
            <Column>
                <Divider>Timeline</Divider>
                <TimelineChart/>
            </Column>
        }
        />
    );
}

export default InvestmentsScreen;
