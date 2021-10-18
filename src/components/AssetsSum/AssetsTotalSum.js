import React from 'react';
import classes from './AssetsTotalSum.module.css';
import { useSelector } from 'react-redux';

const AssetsTotalSum = () => {
    const assetsStore = useSelector(state => state.assets.countries);

    let summary = 0;
    if(assetsStore.length > 0) {
        assetsStore.forEach(country => {
            if(country.assets !== 0) {
                const sum = country.assets.reduce((acc, currAsset) => {
                    const amount = Number.parseFloat(currAsset.amount * currAsset.rate).toFixed(2);
                    return acc + Number.parseFloat(amount);
                }, 0);
                summary += sum;
            }
        })
    }

  return(
      <div className={classes.container}>
          <p>Total assets sum: {Number.parseFloat(summary).toFixed(2)} UAH</p>
      </div>
  );
}

export default AssetsTotalSum;
