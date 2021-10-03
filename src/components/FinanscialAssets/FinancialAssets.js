import React, { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as assetAcions from '../../store/actions/assets';
import classes from './FinancialAssets.module.css';
import { Button, Input } from 'antd';
import CountryTable from './CountryTable';

const FinancialAssets = () => {
    const [newCountry, setNewCountry] = useState("");
    const store = useSelector(state => state.assets.countries);
    const dispatch = useDispatch();

    const newCountryInputChangeHandler = (event) => {
      setNewCountry(event.target.value);
    }

    const addCountryHandler = () => {
        if(!newCountry.trim()) {
            alert('Input valid country name');
            return;
        }
        const countryId = newCountry + Math.random();
        dispatch(assetAcions.addCountry(countryId, newCountry));
        setNewCountry("");
    }

    let content;
    if(store.length > 0) {
        content = <div className={classes.container}>
            {store.map(country => {
                return(
                    <CountryTable key={country.id} countryName={country.name} />
                );
            })}
        </div>;
    }

  return (
      <Fragment>
          <div>
              <div className={classes.container}>
                  {content}
                  <div className={classes.countryInputContainer}>
                      <Input type="text" id="countryName" value={newCountry} onChange={newCountryInputChangeHandler}/>
                      <Button onClick={addCountryHandler} >Add country</Button>
                  </div>
              </div>
          </div>
      </Fragment>
  );
}

export default  FinancialAssets;
