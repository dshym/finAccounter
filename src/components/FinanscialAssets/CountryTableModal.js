import React, {useState} from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {Input, Modal, Select} from 'antd';
import * as assetActions from "../../store/actions/assets";
import CURRENCIES from "../../CURRENCIES";

const {Option} = Select;

const CountryTableModal = (props) => {
    const [nameInput, setNameInput] = useState("");
    const [amountInput, setAmountInput] = useState(0);
    const [currency, setCurrency] = useState(CURRENCIES.UAH.name);

    const currenciesStore = useSelector(state => state.currencies.currencies);

    const dispatch = useDispatch();

    const nameInputChangeHandler = (event) => {
        setNameInput(event.target.value);
    }

    const amountInputChangeHandler = (event) => {
        setAmountInput(event.target.value);
    }

    const selectChangeHandler = (value) => {
        setCurrency(value);
    }

    const addAssetHandler = () => {
        if(!nameInput.trim()) {
            alert('Input asset name');
            return;
        }
        if(amountInput < 0) {
            alert('Amount should be > 0');
            return;
        }
        const currencyWithRate = currenciesStore.find(curr => {
            return curr.cc === currency;
        });
        if(currencyWithRate) {
            dispatch(assetActions.addAsset(Math.random(),
                nameInput,
                Number.parseFloat(amountInput).toFixed(2),
                props.countryName,
                currency,
                currencyWithRate.rate
            ));
        } else {
            dispatch(assetActions.addAsset(Math.random(),
                nameInput,
                Number.parseFloat(amountInput).toFixed(2),
                props.countryName,
                currency,
                1
            ));
        }
        setNameInput("");
        setAmountInput(0);
        setCurrency(CURRENCIES.UAH.name);
        props.onCancel();
    };
  return(
      <Modal title="Add asset" visible={props.visible} onOk={addAssetHandler} onCancel={props.onCancel}>
          <label htmlFor="assetName">Asset name</label><br/>
          <Input type="text" required id="assetName" value={nameInput} onChange={nameInputChangeHandler}/>
          <br/>
          <label htmlFor="amount">Amount</label><br/>
          <Input type="number" id="amount" value={amountInput} onChange={amountInputChangeHandler}/>
          <p>Currency: </p>
          <Select defaultValue={currency} onChange={selectChangeHandler}>
              <Option value={CURRENCIES.UAH.name}>{CURRENCIES.UAH.name}</Option>
              <Option value={CURRENCIES.USD.name}>{CURRENCIES.USD.name}</Option>
              <Option value={CURRENCIES.PLN.name}>{CURRENCIES.PLN.name}</Option>
          </Select>
      </Modal>
  );
}

export default CountryTableModal;
