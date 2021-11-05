import { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { useSelector } from 'react-redux';

const TimelineChart = () => {
    const [chartData, setChartData] = useState([[
        {type: 'string', id: 'InvetsmentName'},
        {type: 'date', id: 'Start'},
        {type: 'date', id: 'End'},
    ]]);
    const investments = useSelector(state => state.investments.investments);

    useEffect(() => {
        const dataArr = [[
            {type: 'string', id: 'InvetsmentName'},
            {type: 'date', id: 'Start'},
            {type: 'date', id: 'End'},
        ]];
        for (const investKey in investments) {
            dataArr.push([investments[investKey].name, new Date(investments[investKey].startDate), new Date(investments[investKey].endDate)]);
        }
        setChartData(dataArr);
    }, [investments]);

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  return (
      <>
          {chartData.length > 1 && <Chart
              width={'100%'}
              chartType="Timeline"
              loader={<Spin indicator={antIcon}/>}
              data={chartData}
              options={{
                  showRowNumber: true,
              }}

          />}
      </>
  );
}

export default TimelineChart;
