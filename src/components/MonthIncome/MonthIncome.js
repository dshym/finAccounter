import React, { useState, useEffect } from 'react';

import classes from './MonthIncome.module.css';

import { useDispatch, useSelector } from 'react-redux';
import * as incomeActions from '../../store/actions/income';
import CURRENCIES from '../../CURRENCIES';

import {Input, Select} from 'antd';
import IncomeItem from './IncomeItem';
import {CheckSquareFilled} from '@ant-design/icons';
const { Option } = Select;

const MonthIncome = () => {
    const [incomeName, setIncomeName] = useState(" ");
    const [incomeAmount, setIncomeAmount] = useState(0);
    const [currency, setCurrency] = useState(CURRENCIES.hryvna.name);
    const [summary, setSummary] = useState(0);

    const incomesStore = useSelector(state => state.income.incomes); //arr of income objects
    const currencyStore = useSelector(state => state.currencies.currencies);
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
        dispatch(incomeActions.addIncome(Math.random(), incomeName, incomeAmount, currency));
        setIncomeAmount(0);
        setIncomeName(" ");
    }

    useEffect(() => {
        const calculateSummary = () => {
            if(incomesStore.length <= 0) {
                return;
            }
            const sum = incomesStore.reduce((acc, currVal) => {
                let amount = 0;
                if(currVal.currency === CURRENCIES.hryvna.name) {
                    amount += Number.parseFloat(currVal.amount);
                } else {
                    const currencyWithRate = currencyStore.find(currency => currency.cc === currVal.currency);
                    amount = currVal.amount * currencyWithRate.rate;
                }
                return acc + amount;
            }, 0);
            setSummary(sum);
        }
        calculateSummary();
    },[incomesStore, currencyStore]);

  return(
      <div className={classes.container}>
          <table>
              <thead>
                  <tr>
                      <th>Income name</th>
                      <th>Amount</th>
                      <th>Currency</th>
                  </tr>
              </thead>
              <tbody>
                  {incomesStore.map(income => {
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
                      <td>
                          <Input type="text" id="incomeName" value={incomeName} onChange={incomeNameInputHandler}/>
                      </td>
                      <td>
                          <Input type="number" id="incomeAmount" value={incomeAmount} onChange={incomeAmountInputHandler} />
                      </td>
                      <td>
                          <Select defaultValue={currency} onChange={selectChangeHandler}>
                              <Option value={CURRENCIES.hryvna.name}>{CURRENCIES.hryvna.name}</Option>
                              <Option value={CURRENCIES.dollar.name}>{CURRENCIES.dollar.name}</Option>
                              <Option value={CURRENCIES.zloty.name}>{CURRENCIES.zloty.name}</Option>
                          </Select>
                      </td>
                      <td>
                          <CheckSquareFilled className={classes.icon} onClick={addIncomeHandler}/>
                      </td>
                  </tr>
                  <tr>
                      <th>Summary:</th>
                      <th>{Number.parseFloat(summary).toFixed(2)}</th>
                      <th>{CURRENCIES.hryvna.name}</th>
                  </tr>
              </tbody>
          </table>
      </div>
  );
}

export default MonthIncome;
