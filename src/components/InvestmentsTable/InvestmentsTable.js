import React, {useState} from 'react';
import validator from "validator";
import { useSelector, useDispatch } from 'react-redux';
import * as investmentActions from '../../store/actions/investments';
import {Investment} from "../../Classes/Investment";
import classes from './InvestmentsScreen.module.css';
import {Input, DatePicker, Select} from 'antd';
import InvestmentItem from "./InvestmentItem";
import {CheckSquareFilled} from "@ant-design/icons";
import {openNotificationWithIcon} from '../CustomNotification/CustomNotification';
import CURRENCIES from "../../CURRENCIES";
import {getRandId} from '../../randId';
const { Option } = Select;
const { RangePicker } = DatePicker;

const InvestmentsTable = () => {
    const [investmentName, setInvestmentName] = useState('');
    const [investmentAmount, setInvestmentAmount] = useState(0);
    const [currency, setCurrency] = useState(CURRENCIES.UAH.name);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const currencyStore = useSelector(state => state.currencies.currencies);
    const investments = useSelector(state => state.investments.investments);
    const dispatch = useDispatch();


    const selectChangeHandler = (value) => {
        setCurrency(value);
    }

    const setDatesHandler = (dates, dateStrings) => {
        setStartDate(dateStrings[0]);
        setEndDate(dateStrings[1]);
    }

    const addInvestmentHandler = () => {
        if(validator.isEmpty(investmentName)) {
            openNotificationWithIcon ("warning", "Invalid investment name", "Enter valid investment name");
            return;
        }
        if(investmentAmount < 0) {
            openNotificationWithIcon ("warning","Invalid investment amount", "Enter valid investment amount");
            return;
        }
        if(!startDate || !endDate) {
            openNotificationWithIcon ("warning","Invalid dates", "Enter valid dates");
            return;
        }
        const currencyWithRate = currencyStore.find(curr => curr.cc === currency);
        let investment;
        if(!currencyWithRate) {
            investment = new Investment(getRandId(), investmentName, investmentAmount, currency, 1, startDate, endDate);
        } else {
            investment = new Investment(getRandId(), investmentName, investmentAmount, currency, currencyWithRate.rate, startDate, endDate);
        }
        dispatch(investmentActions.addInvestment(investment));
        setInvestmentName('');
        setInvestmentAmount(0);
        setCurrency(CURRENCIES.UAH.name);
    }

    let bodyContent;
    if(investments === undefined) {
        bodyContent = <></>;
    } else {
        bodyContent = Object.entries(investments).map(investment => <InvestmentItem key={investment[0]} investment={investment[1]} />)
    }

  return (
      <div className={classes.investmentsTable}>
          <table>
              <thead>
              <tr>
                  <th>Investment name</th>
                  <th>Amount</th>
                  <th>Currency</th>
                  <th>Dates</th>
              </tr>
              </thead>
              <tbody>
                {bodyContent}
                <tr>
                    <td>
                        <Input
                            type="text" id="investmentName"
                            value={investmentName}
                            onChange={(name) => setInvestmentName(name.target.value)}
                        />
                    </td>
                    <td>
                        <Input
                            type="number"
                            id="investmentAmount"
                            value={investmentAmount}
                            onChange={(amount) => setInvestmentAmount(amount.target.value)}
                        />
                    </td>
                    <td>
                        <Select defaultValue={currency} onChange={selectChangeHandler}>
                            <Option value={CURRENCIES.UAH.name}>{CURRENCIES.UAH.name}</Option>
                            <Option value={CURRENCIES.USD.name}>{CURRENCIES.USD.name}</Option>
                            <Option value={CURRENCIES.PLN.name}>{CURRENCIES.PLN.name}</Option>
                        </Select>
                    </td>
                    <td><RangePicker onChange={setDatesHandler}/></td>
                    <td>
                        <CheckSquareFilled className={classes.icon} onClick={addInvestmentHandler}/>
                    </td>
                </tr>
              </tbody>
          </table>
      </div>
  );
}

export default InvestmentsTable;
