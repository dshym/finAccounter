import React, { useState, Fragment } from 'react';
import classes from './IncomeItem.module.css';

import { useDispatch } from 'react-redux';
import * as incomeActions from '../../store/actions/income';
import Currencies from "../../currencies/currencies";
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
            <th><Input type="text" id="incomeName" value={incomeName} onChange={incomeNameChangeHandler}/></th>
            <th><Input type="number" id="incomeAmount" value={incomeAmount} onChange={incomeAmountChangeHandler}/></th>
            <th>
                <Select defaultValue={currency} onChange={selectChangeHandler}>
                    <Option value={Currencies.hryvna.id}>{Currencies.hryvna.name}</Option>
                    <Option value={Currencies.dollar.id}>{Currencies.dollar.name}</Option>
                    <Option value={Currencies.zloty.id}>{Currencies.zloty.name}</Option>
                </Select>
            </th>
            <th>
                <CheckSquareFilled className={classes.icon} onClick={editIncomeHandler}/>
            </th>
        </tr>
    } else {
        content = <Popover trigger="click" content={popoverContent} placement="topLeft">
            <tr>
                <th>{props.name}</th>
                <th>{Number.parseFloat(props.amount).toFixed(2)}</th>
                <th>{props.currency}</th>
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