import React, {useEffect, useState} from 'react';

import { useSelector } from 'react-redux';

const AssetsTotalSum = () => {
    const [sum, setSum] = useState(0);
    const assetsStore = useSelector(state => state.assets.countries);

    useEffect(() => {
        if(assetsStore.length > 0) {
            let summary = 0;
            assetsStore.forEach(country => {
                const sum = country.assets.reduce((acc, currAsset) => {
                    const amount = Number.parseFloat(currAsset.amount * currAsset.rate).toFixed(2);
                    return acc + Number.parseFloat(amount);
                }, 0);
                summary += sum;
            })
            setSum(summary);
        }
    }, [assetsStore]);


  return(
      <div>
          <p>Total assets sum: {Number.parseFloat(sum).toFixed(2)} UAH</p>
      </div>
  );
}

export default AssetsTotalSum;
