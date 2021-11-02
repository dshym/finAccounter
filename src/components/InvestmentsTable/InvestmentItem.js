import React, {useState} from 'react';

import { useDispatch } from 'react-redux';
import * as investmentActions from '../../store/actions/investments';

import {Button, Popover} from 'antd';
import classes from "../MonthIncome/IncomeItem.module.css";
const InvestmentItem = ({investment}) => {
    const { id, name, amount, currency, startDate, endDate} = investment;
    const [mode, setMode] = useState(false); //false - default mode, true - edit mode
    const dispatch = useDispatch();
    const changeMode = () => {
        setMode(prevState => !prevState);
    }

    const deleteIncomeHandler = () => {
        dispatch(investmentActions.deleteInvestment(id));
    }

    const popoverContent = <div className={classes.popover}>
        <Button onClick={changeMode}>Edit</Button>
        <Button danger onClick={deleteIncomeHandler} >Delete</Button>
    </div>

  return (
      <Popover trigger="click" content={popoverContent} placement="topLeft">
          <tr>
              <td>{name}</td>
              <td>{Number.parseFloat(amount).toFixed(2)}</td>
              <td>{currency}</td>
              <td>From <strong>{startDate}</strong> to <strong>{endDate}</strong></td>
          </tr>
      </Popover>

  );
}

export default InvestmentItem;
