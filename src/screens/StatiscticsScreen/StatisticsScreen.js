import React, {useEffect, useState} from 'react';
import classes from './StatisticsScreen.module.css';

import { useSelector } from 'react-redux';

import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';
import AssetsTotalSum from "../../components/AssetsSum/AssetsTotalSum";
import TransactionsFilter from "../../components/TransactionsFilter/TransactionsFilter";

const StatisticsScreen = () => {
    const [chartData, setChartData] = useState([]);

    const assetsStore = useSelector(state => state.assets);

    useEffect(() => {
        if(assetsStore.countries.length > 0) {
            let chartData = [];
            assetsStore.countries.forEach(country => {
                let countryAssetsSum = country.assets.reduce((acc, currAsset) => {
                    let amount = Number.parseFloat(currAsset.amount * currAsset.rate).toFixed(2);
                    return acc + Number.parseFloat(amount);
                }, 0);
                const fixed = Number.parseFloat(Number(countryAssetsSum).toFixed(2));
                const chartElem = {
                    name: country.name,
                    value: fixed,
                }
                chartData.push(chartElem);
            });
            setChartData(chartData);
        }
    }, [assetsStore]);

  return(
      <div className={classes.statContainer}>
          <div className={classes.chartContainer}>
              <AssetsTotalSum />
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
                  <Cell/>
                  <Legend/>
                  <Tooltip/>
              </PieChart>
          </div>
          <div className={classes.rigthColumn}>
              <TransactionsFilter />
          </div>
      </div>

  );
}

export default StatisticsScreen;
