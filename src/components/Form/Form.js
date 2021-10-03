import React, { useState, useRef } from 'react';

import classes from './Form.module.css';

import { useDispatch, useSelector } from 'react-redux';
import * as transactionActionTypes from '../../store/actions/transactionsActionTypes';
import * as trancactionActions from '../../store/actions/transactions';
import * as assetsActions from '../../store/actions/assets';

import Switch from 'react-switch';
import {Button, Input, Select, DatePicker} from "antd";
const {Option} = Select;

const Form = () => {
    const [switchPosition, setSwicthPosition] = useState(false);
    const [selectedDate, setSelectedDate] = useState();
    const nameInputRef = useRef();
    const categoryInputRef = useRef();
    const amountInputRef = useRef();
    const addInfoInputRef = useRef();
    const [selectedAssetId, setSelectedAssetId] = useState();
    const countriesList = useSelector(state => state.assets.countries);
    const dispatch = useDispatch();

    const switchToggleHandler = () => {
      setSwicthPosition(prevState => !prevState);
    }

    const selectHandler = (value) => {
      setSelectedAssetId(value);
    }

    const datePickerHandler = (date, dateString) => {
        setSelectedDate(dateString);
    }

    const formSubmitHandler = () => {
      if(!nameInputRef.current.state.value || nameInputRef.current.state.value.trim().length <= 0) {
          alert('Enter valid transaction name');
          return;
      }
      if(!categoryInputRef.current.state.value || categoryInputRef.current.state.value.trim().length <= 0) {
          alert('Enter valid category name');
          return;
      }
      if(!amountInputRef.current.state.value || amountInputRef.current.state.value <= 0) {
          alert('Enter number > 0');
          return;
      }
      if(!selectedDate) {
          alert('Select a date');
          return;
      }
      let transactionType = switchPosition ? transactionActionTypes.ADD_INCOME_TRANSACTION
          : transactionActionTypes.ADD_OUTCOME_TRANSCACTION;
      let selectedAsset;
      let selectedCountryName;
      const BreakException = {};
      try{
          countriesList.forEach(country => {
              selectedAsset = country.assets.find(asset => asset.id === selectedAssetId);
              if(selectedAsset) {
                  selectedCountryName = country.name;
                  throw BreakException;
              }
          })
      } catch (e) {
          if (e !== BreakException) throw e;
      }


        let newAmount = 0;
        if(transactionType === transactionActionTypes.ADD_INCOME_TRANSACTION) {
            newAmount = Number.parseFloat(selectedAsset.amount) + Number.parseFloat(amountInputRef.current.state.value);
        }else {
            newAmount = selectedAsset.amount - Number.parseFloat(amountInputRef.current.state.value);
        }
        if(newAmount < 0) {
            alert('Choose another asset, asset amount will be < 0 after this transaction');
            return;
        }
      const newTransaction = {
          name: nameInputRef.current.state.value,
          category: categoryInputRef.current.state.value,
          amount: amountInputRef.current.state.value,
          additionalInfo: addInfoInputRef.current.resizableTextArea.props.value ? addInfoInputRef.current.resizableTextArea.props.value : " ",
          date: selectedDate,
      };
      dispatch(trancactionActions.addTransaction(transactionType, newTransaction));
      dispatch(assetsActions.editAsset(selectedAssetId, selectedAsset.name, newAmount, selectedCountryName));
    }

 return(
     <div className={classes.formContainer}>
         <div className={classes.topContainer}>
             <p>Add outcome</p>
             <Switch checked={switchPosition} onChange={switchToggleHandler} offColor={'#ff262d'} height={22} width={46}/>
             <p>Add income</p>
         </div>
         <form>
            <label htmlFor='name'>
                Name:
                <Input type='text' id='name' ref={nameInputRef} />
            </label>
             <label htmlFor='category'>
                 Category:
                 <Input type='text' id='category' ref={categoryInputRef} />
             </label>
             <label htmlFor='amount'>
                 Amount:
                 <Input type='number' id='amount' ref={amountInputRef} />
             </label>
             <label htmlFor='additionalInfo'>
                 Additional info:
                 <Input.TextArea type='text' rows={4} ref={addInfoInputRef} />
             </label>
             <hr/>
             <DatePicker onChange={datePickerHandler} />
             <p>Transaction account</p>
             <Select defaultValue={"Select asset"} style={{width: 400, marginBottom: 10}} onChange={selectHandler}>
                 {countriesList.length > 0 ? countriesList.map(country => {
                     return country.assets.map(asset => {
                         return <Option  value={asset.id}>{asset.name} {asset.amount}</Option>
                     })
                 }) : <Option value={"addData"}>Add assets</Option> }
             </Select>
             <br/>
             <Button type='submit' onClick={formSubmitHandler}>Add transaction</Button>
         </form>
     </div>
 );
}

export default Form;
