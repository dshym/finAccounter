import React, { useState, Fragment } from 'react';
import classes from './IncomeItem.module.css';

import { useDispatch } from 'react-redux';
import * as incomeActions from '../../store/actions/income';
import CURRENCIES from "../../CURRENCIES";
import { Popover, Input, Select, Button } from 'antd';
import {CheckSquareFilled} from "@ant-design/icons";

const { Option } = Select;
const IncomeItem = (props) => {
    const [incomeName, setIncomeName] = useState(props.name);
    const [incomeAmount ,setIncomeAmount] = useState(props.amount);
    const [currency, setCurrency] = useState(props.currency);
    const [editMode, setEditMode] = useState(false);

    const dispatch = useDispatch();

    const changeMode = () => {
      setEditMode(prevState => !prevState);
    }

    const incomeNameChangeHandler = (event) => {
      setIncomeName(event.target.value);
    }

    const incomeAmountChangeHandler = (event) => {
      setIncomeAmount(event.target.value);
    }

    const selectChangeHandler = (value) => {
        setCurrency(value);
    }

    const editIncomeHandler = () => {
      if(!incomeName.trim()) {
          alert("Enter valid name");
          return;
      }
      if(Number.parseFloat(incomeAmount) < 0) {
          alert("Enter valid number");
          return;
      }
      dispatch(incomeActions.editIncome(props.id, incomeName, incomeAmount, currency));
      setEditMode(false);
    }

    const deleteIncomeHandler = () => {
        dispatch(incomeActions.deleteIncome(props.id));
    }

    const popoverContent = <div className={classes.popover}>
        <Button onClick={changeMode}>Edit</Button>
        <Button danger onClick={deleteIncomeHandler} >Delete</Button>
    </div>

    let content;
    if(editMode) {
        content = <tr>
            <td><Input type="text" id="incomeName" value={incomeName} onChange={incomeNameChangeHandler}/></td>
            <td><Input type="number" id="incomeAmount" value={incomeAmount} onChange={incomeAmountChangeHandler}/></td>
            <td>
                <Select defaultValue={currency} onChange={selectChangeHandler}>
                    <Option value={CURRENCIES.hryvna.name}>{CURRENCIES.hryvna.name}</Option>
                    <Option value={CURRENCIES.dollar.name}>{CURRENCIES.dollar.name}</Option>
                    <Option value={CURRENCIES.zloty.name}>{CURRENCIES.zloty.name}</Option>
                </Select>
            </td>
            <td>
                <CheckSquareFilled className={classes.icon} onClick={editIncomeHandler}/>
            </td>
        </tr>
    } else {
        content = <Popover trigger="click" content={popoverContent} placement="topLeft">
            <tr>
                <td>{props.name}</td>
                <td>{Number.parseFloat(props.amount).toFixed(2)}</td>
                <td>{props.currency}</td>
            </tr>
        </Popover>
    }

  return(
      <Fragment>
          {content}
      </Fragment>
  );
}

export default IncomeItem;
