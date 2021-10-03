import React, {useState} from 'react';

import { useDispatch } from 'react-redux';

import {Input, Modal} from 'antd';
import * as assetActions from "../../store/actions/assets";

const CountryTableModal = (props) => {
    const [nameInput, setNameInput] = useState("");
    const [amountInput, setAmountInput] = useState(0);

    const dispatch = useDispatch();

    const nameInputChangeHandler = (event) => {
        setNameInput(event.target.value);
    }

    const amountInputChangeHandler = (event) => {
        setAmountInput(event.target.value);
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
        //add asset to redux
        dispatch(assetActions.addAsset(Math.random(), nameInput, Number.parseFloat(amountInput).toFixed(2), props.countryName));
        setNameInput("");
        setAmountInput(0);
        props.onCancel();
    };
  return(
      <Modal title="Add asset" visible={props.visible} onOk={addAssetHandler} onCancel={props.onCancel}>
          <label htmlFor="assetName">Asset name</label><br/>
          <Input type="text" required id="assetName" value={nameInput} onChange={nameInputChangeHandler}/>
          <br/>
          <label htmlFor="amount">Amount</label><br/>
          <Input type="number" id="amount" value={amountInput} onChange={amountInputChangeHandler}/>
      </Modal>
  );
}

export default CountryTableModal;
