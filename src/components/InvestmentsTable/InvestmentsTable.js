import React from 'react';
import classes from './InvestmentsScreen.module.css';
import {Input, DatePicker} from 'antd';

const { RangePicker } = DatePicker;
const InvestmentsTable = () => {
  return (
      <div className={classes.investmentsTable}>
          <table>
              <thead>
              <tr>
                  <th>Investment name</th>
                  <th>Amount</th>
                  <th>Dates</th>
              </tr>
              </thead>
              <tbody>
                <tr>
                    <td><Input type="text" id="investmentName"/></td>
                    <td><Input type="number" id="investmentAmount"/></td>
                    <td><RangePicker/></td>
                </tr>
              </tbody>
          </table>
      </div>
  );
}

export default InvestmentsTable;
