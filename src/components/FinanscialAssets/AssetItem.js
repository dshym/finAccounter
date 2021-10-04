import React, {Fragment, useState, useEffect} from 'react';
import classes from './AssetItem.module.css';

import {useDispatch, useSelector} from 'react-redux';
import * as assetsActions from '../../store/actions/assets';

import {Popover, Button, Input, Select} from 'antd';
import CURRENCIES from "../../CURRENCIES";

const { Option } = Select;

const AssetItem = (props) => {
    const [assetName, setAssetName] = useState();
    const [assetAmount, setAssetAmount] = useState();
    const [currency, setCurrency] = useState();
    const [editMode, setEditMode] = useState(false);
    const dispatch = useDispatch();

    const deleteAssetHandler = () => {
        dispatch(assetsActions.deleteAsset(props.assetData.id, props.countryName));
    }

    const currenciesStore = useSelector(state => state.currencies.currencies);

    const updateAssetDataHandler = () => {
        if(!assetName.trim()) {
            alert('Enter valid name');
            return;
        }
        if(!Number.isInteger(Number.parseInt(assetAmount))) {
            alert('Enter valid amount > 0');
            return;
        }
        const amount = Number.parseFloat(assetAmount).toFixed(2);
        const currencyWithRate = currenciesStore.find(curr => curr.cc === currency);
        if(currencyWithRate) {
            dispatch(assetsActions.editAsset(props.assetData.id, assetName, amount, props.countryName, currency, currencyWithRate.rate));
        } else {
            dispatch(assetsActions.editAsset(props.assetData.id, assetName, amount, props.countryName, currency, 1));
        }
        setEditMode(false);
    }

    const selectChangeHandler = (value) => {
      setCurrency(value);
    }

    const assetNameChangeHandler = (event) => {
        setAssetName(event.target.value);
    }

    const assetAmountChangeHandler = (event) => {
        setAssetAmount(event.target.value);
    }

    const changeModeHandler = () => {
        setEditMode(prevState => !prevState);
    }

    useEffect(() => {
        setAssetName(props.assetData.name);
        setAssetAmount(props.assetData.amount);
        setCurrency(props.assetData.currency);
    },[props.assetData.name, props.assetData.amount]);

    const popoverContent = <div className={classes.popover}>
        <Button onClick={changeModeHandler}>Edit</Button>
        <Button danger onClick={deleteAssetHandler}>Delete</Button>
    </div>

    let content;
    if(editMode) {
        content = <tr>
            <td><Input type="text" id="name" value={assetName} onChange={assetNameChangeHandler} onBlur={updateAssetDataHandler}/></td>
            <td><Input type="number" id="amount" value={assetAmount} onChange={assetAmountChangeHandler} onBlur={updateAssetDataHandler}/></td>
            <td>
                <Select defaultValue={currency} onChange={selectChangeHandler} onBlur={updateAssetDataHandler}>
                    <Option value={CURRENCIES.UAH.name}>{CURRENCIES.UAH.name}</Option>
                    <Option value={CURRENCIES.USD.name}>{CURRENCIES.USD.name}</Option>
                    <Option value={CURRENCIES.PLN.name}>{CURRENCIES.PLN.name}</Option>
                </Select>
            </td>
        </tr>
    } else {
        content = <Popover trigger="click" placement="topLeft" content={popoverContent}>
            <tr>
                <td>{assetName}</td>
                <td>{Number.parseFloat(assetAmount).toFixed(2)}</td>
                <td>{currency}</td>
            </tr>
        </Popover>
    }

  return(
      <Fragment>
          {content}
      </Fragment>
  );
}

export default AssetItem;
