import React, { Fragment } from 'react';

import classes from './FinancialAssets.module.css';

import CountryTable from './CountryTable';

const FinancialAssets = () => {
  return (
      <Fragment>
          <div className={classes.container}>
            <CountryTable countryName={"Ukraine"} />
              <CountryTable countryName={"Poland"} />
          </div>
      </Fragment>
  );
}

export default  FinancialAssets;