import React, {useState} from 'react';

import { useDispatch } from 'react-redux';
import * as investmentActions from '../../store/actions/investments';

import {Button, Input, Popover, Select, DatePicker} from 'antd';
import classes from "../MonthIncome/IncomeItem.module.css";
import CURRENCIES from "../../CURRENCIES";
import {Investment} from '../../Classes/Investment';
import {openNotificationWithIcon} from '../CustomNotification/CustomNotification';
import moment from "moment";
const {Option} = Select;
const {RangePicker} = DatePicker;

const InvestmentItem = ({investment}) => {
    const { id, name, amount, currency, rate, startDate, endDate} = investment;
    const [newInvestmentName, setNewInvestmentName] = useState(name);
    const [newInvestmentAmount, setNewInvestmentAmount] = useState(amount);
    const [newCurrency, setNewCurrency] = useState(currency);
    const [newStartDate, setNewStartDate] = useState('');
    const [newEndDate, setNewEndDate] = useState('');
    const [mode, setMode] = useState(false); //false - default mode, true - edit mode
    const dispatch = useDispatch();
    const changeMode = () => {
        setMode(prevState => !prevState);
    }

    const setDatesHandler = (dates, dateStrings) => {
        setNewStartDate(dateStrings[0]);
        setNewEndDate(dateStrings[1]);
    }

    const deleteIncomeHandler = () => {
        dispatch(investmentActions.deleteInvestment(id));
    }

    const editInvestmentHandler = () => {
        if(newInvestmentName.trim().length === 0) {
            openNotificationWithIcon('warning', 'Enter valid name', 'Invalid name');
            return;
        }
        if(newInvestmentAmount < 0) {
            openNotificationWithIcon('warning', 'Enter valid name', 'Invalid name');
            return;
        }
        if(!newCurrency) {
            openNotificationWithIcon('warning', 'Choose currency', 'Invalid currency');
            return;
        }
        if(!newStartDate || !newEndDate) {

        }
        const editedInvestment = new Investment(
            id,
            newInvestmentName,
            newInvestmentAmount,
            newCurrency,
            rate,
            newStartDate ? newStartDate : startDate,
            newEndDate ? newEndDate : endDate,
        );
        dispatch(investmentActions.editInvestment(id, editedInvestment));
        setMode(false);
    }

    const popoverContent = <div className={classes.popover}>
        <Button onClick={changeMode}>Edit</Button>
        <Button danger onClick={deleteIncomeHandler} >Delete</Button>
    </div>

    let content;
    if(mode) { //false - default mode, true - edit mode
        content = <tr onBlur={editInvestmentHandler}>
            <td>
                <Input
                    type="text" id="investmentName"
                    value={newInvestmentName}
                    onChange={(name) => setNewInvestmentName(name.target.value)}
                />
            </td>
            <td>
                <Input
                    type="number"
                    id="investmentAmount"
                    value={newInvestmentAmount}
                    onChange={(amount) => setNewInvestmentAmount(amount.target.value)}
                />
            </td>
            <td>
                <Select defaultValue={newCurrency} onChange={value => setNewCurrency(value)}>
                    <Option value={CURRENCIES.UAH.name}>{CURRENCIES.UAH.name}</Option>
                    <Option value={CURRENCIES.USD.name}>{CURRENCIES.USD.name}</Option>
                    <Option value={CURRENCIES.PLN.name}>{CURRENCIES.PLN.name}</Option>
                </Select>
            </td>
            <td><RangePicker defaultValue={[moment(startDate), moment(endDate)]} onChange={setDatesHandler}/></td>
        </tr>
    } else {
        content = <Popover trigger="click" content={popoverContent} placement="topLeft">
            <tr>
                <td>{name}</td>
                <td>{Number.parseFloat(amount).toFixed(2)}</td>
                <td>{currency}</td>
                <td>From <strong>{startDate}</strong> to <strong>{endDate}</strong></td>
            </tr>
        </Popover>;
    }

  return (
      <>{content}</>
  );
}

export default InvestmentItem;
