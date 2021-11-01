import React, {useEffect, useState} from 'react';
import classes from './StatisticsScreen.module.css';

import { useSelector } from 'react-redux';
import { Divider } from 'antd';
import AssetsTotalSum from "../../components/AssetsSum/AssetsTotalSum";
import TransactionsFilter from "../../components/TransactionsFilter/TransactionsFilter";

import Chart from "../../components/Chart/Chart";

const StatisticsScreen = () => {
    const [chartData, setChartData] = useState([]);

    const assetsStore = useSelector(state => state.assets);

    useEffect(() => {
        if(assetsStore.countries.length > 0) {
            let chartData = [];
            assetsStore.countries.forEach(country => {
                let countryAssetsSum;
                if(country.assets !== 0) {
                    countryAssetsSum = country.assets.reduce((acc, currAsset) => {
                        let amount = Number.parseFloat(currAsset.amount * currAsset.rate).toFixed(2);
                        return acc + Number.parseFloat(amount);
                    }, 0);
                }

                const fixed = Number.parseFloat(Number(countryAssetsSum).toFixed(2));
                const chartElem = {
                    type: country.name,
                    value: fixed,
                }
                chartData.push(chartElem);
            });
            setChartData(chartData);
        }
    }, [assetsStore]);

  return(
      <div className={classes.statContainer}>
          <Divider />
          <div className={classes.chartContainer}>
              <AssetsTotalSum />
              <h3>Assets Allocation: </h3>
              {assetsStore.countries.length > 0 ? <Chart data={chartData}/> : <p>No chart data...</p>}
          </div>
          <div className={classes.rigthColumn}>
              <TransactionsFilter />
          </div>
      </div>
  );
}

export default StatisticsScreen;
