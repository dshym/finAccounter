import React, { useState, useEffect } from 'react';

import classes from './MonthIncome.module.css';

import { useDispatch, useSelector } from 'react-redux';
import * as incomeActions from '../../store/actions/income';
import Currencies from "../../currencies/currencies";
import {Input, Select} from 'antd';
import IncomeItem from './IncomeItem';
import {CheckSquareFilled} from '@ant-design/icons';
const { Option } = Select;

const MonthIncome = () => {
    const [incomeName, setIncomeName] = useState(" ");
    const [incomeAmount, setIncomeAmount] = useState(0);
    const [currency, setCurrency] = useState(Currencies.hryvna.name);
    const [summary, setSummary] = useState(0);

    const store = useSelector(state => state.income.incomes); //arr of income objects
    const dispatch = useDispatch();

    const selectChangeHandler = (value) => {
        setCurrency(value);
    }

    const incomeNameInputHandler = (event) => {
      setIncomeName(event.target.value);
    }

    const incomeAmountInputHandler = (event) => {
        setIncomeAmount(event.target.value);
    }

    const addIncomeHandler = () => {
        if(!incomeName.trim()) {
            alert('Enter income name');
            return;
        }
        if(Number.parseFloat(incomeAmount) < 0) {
            alert('Enter valid number');
            return;
        }
        dispatch(incomeActions.addIncome(Math.random(), incomeName, incomeAmount, Currencies[currency].name));
        setIncomeAmount(0);
        setIncomeName(" ");
    }



    useEffect(() => {
        const calculateSummary = () => {
            if(store.length <= 0) {
                return;
            }
            const sum = store.reduce((acc, currVal) => {
                //add logic for different currencies
                return acc + currVal.amount;
            }, 0);
            setSummary(sum);
        }
        calculateSummary();
    },[store]);

  return(
      <div className={classes.container}>
          <table>
              <tbody>
                  <tr>
                      <th>Income name</th>
                      <th>Amount</th>
                      <th>Currency</th>
                  </tr>
                  {store.map(income => {
                      return (
                          <IncomeItem
                              key={income.id}
                              id={income.id}
                              name={income.name}
                              amount={income.amount}
                              currency={income.currency}
                          />
                      );
                  })}
                  <tr>
                      <th>Summary:</th>
                      <th>{Number.parseFloat(summary).toFixed(2)}</th>
                      <th>{Currencies.hryvna.name}</th>
                  </tr>
                  <tr>
                      <th>
                          <Input type="text" id="incomeName" value={incomeName} onChange={incomeNameInputHandler}/>
                      </th>
                      <th>
                          <Input type="number" id="incomeAmount" value={incomeAmount} onChange={incomeAmountInputHandler} />
                      </th>
                      <th>
                          <Select defaultValue={currency} onChange={selectChangeHandler}>
                              <Option value={Currencies.hryvna.id}>{Currencies.hryvna.name}</Option>
                              <Option value={Currencies.dollar.id}>{Currencies.dollar.name}</Option>
                              <Option value={Currencies.zloty.id}>{Currencies.zloty.name}</Option>
                          </Select>
                      </th>
                      <th>
                          <CheckSquareFilled className={classes.icon} onClick={addIncomeHandler}/>
                      </th>
                  </tr>
              </tbody>
          </table>
      </div>
  );
}

export default MonthIncome;