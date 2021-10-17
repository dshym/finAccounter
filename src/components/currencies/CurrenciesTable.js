import React from 'react';
import classes from './CurrenciesTable.module.css';

import { useSelector } from 'react-redux';

const CurrenciesTable = () => {
    const store = useSelector(state => state.currencies.currencies);

  return(
      <div className={classes.container}>
          <table>
              <thead>
              <tr>
                  <th>Currency name</th>
                  <th>Currency rate to UAH</th>
                  <th>Exchange date</th>
              </tr>
              </thead>
              <tbody>
              {store.map(item => {
                  return(
                      <tr key={item.r030}>
                          <td>{item.cc}</td>
                          <td>{item.rate}</td>
                          <td>{item.exchangedate}</td>
                      </tr>
                  );
              })}
              </tbody>
          </table>
      </div>
  );
}

export default CurrenciesTable;
