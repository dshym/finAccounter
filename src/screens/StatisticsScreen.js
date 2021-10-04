import React, {useEffect, useState} from 'react';

import { useSelector } from 'react-redux';

import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';



const StatisticsScreen = () => {
    const [chartData, setChartData] = useState([]);

    const store = useSelector(state => state.assets);

    useEffect(() => {
        if(store.countries.length > 0) {
            let chartData = [];
            store.countries.forEach(country => {
                let countryAssetsSum = country.assets.reduce((acc, currAsset) => {
                    return acc + Number.parseFloat(currAsset.amount);
                }, 0);
                const chartElem = {
                    name: country.name,
                    value: countryAssetsSum,
                }
                chartData.push(chartElem);
            });
            setChartData(chartData);
        }
    }, [store])

  return(
      <div >
          <PieChart width={400} height={400}>
              <Pie
                  dataKey="value"
                  isAnimationActive={false}
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#dec490 "
                  label
              />
              <Legend/>
              <Tooltip/>
          </PieChart>
      </div>

  );
}

export default StatisticsScreen;
