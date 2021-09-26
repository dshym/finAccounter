import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as assetActions from '../../store/actions/assets';
import classes from './CountryTable.module.css';

import { Button, Modal, Input } from 'antd';
import AssetItem from "./AssetItem";
import CountryName from './CountryName';

const CountryTable = (props) => {
    const COUNTRY = props.countryName;
    const [modalVisible, setModalVisible] = useState(false);
    const [nameInput, setNameInput] = useState("");
    const [amountInput, setAmountInput] = useState(0);

    const dispatch = useDispatch();
    const store = useSelector(state => {
        return state.assets.countries.find(country => country.name === COUNTRY) //single country extracted
    });

    const openModalHandler = () => {
      setModalVisible(prevState => !prevState);
    }
    
    const nameInputChangeHandler = (event) => {
        setNameInput(event.target.value);
    }

    const amountInputChangeHandler = (event) => {
        setAmountInput(event.target.value);
    }

    const addAssethandler = () => {
        setModalVisible(false);
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
    }

    let tableContent;
    if(store.assets.length > 0) {
        tableContent = store.assets.map(asset => {
            return(
                <AssetItem key={asset.id} assetData={asset} countryName={props.countryName}/>
            );
        });
    }

  return (
      <div className={classes.container}>
          <CountryName countryId={store.id} countryName={COUNTRY} />
          <table>
              <thead>
                  <tr>
                      <th>Asset name</th>
                      <th>Amount</th>
                  </tr>
              </thead>
              <tbody>
                  {tableContent}
              </tbody>
          </table>
          <Button onClick={openModalHandler}>Add asset</Button>
          <Modal title="Add asset" visible={modalVisible} onOk={addAssethandler} onCancel={openModalHandler}>
              <label htmlFor="assetName">Asset name</label><br/>
              <Input type="text" required id="assetName" value={nameInput} onChange={nameInputChangeHandler}/>
              <br/>
              <label htmlFor="amount">Amount</label><br/>
              <Input type="number" id="amount" value={amountInput} onChange={amountInputChangeHandler}/>
          </Modal>
      </div>
  );
}

export default CountryTable;