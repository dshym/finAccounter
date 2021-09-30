import React, {Fragment, useState, useEffect} from 'react';
import classes from './AssetItem.module.css';

import { useDispatch } from 'react-redux';
import * as assetsActions from '../../store/actions/assets';

import {Popover, Button, Input} from 'antd';

const AssetItem = (props) => {
    const [assetName, setAssetName] = useState();
    const [assetAmount, setAssetAmount] = useState();
    const [editMode, setEditMode] = useState(false);
    const dispatch = useDispatch();

    const deleteAssetHandler = () => {
        dispatch(assetsActions.deleteAsset(props.assetData.id, props.countryName));
    }

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
        dispatch(assetsActions.editAsset(props.assetData.id, assetName, amount, props.countryName));
        setEditMode(false);
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

    const popoverContent = <div className={classes.popover}>
        <Button onClick={changeModeHandler}>Edit</Button>
        <Button danger onClick={deleteAssetHandler}>Delete</Button>
    </div>

    useEffect(() => {
        setAssetName(props.assetData.name);
        setAssetAmount(props.assetData.amount);
    },[props.assetData.name, props.assetData.amount]);

    let content;
    if(editMode) {
        content = <tr>
            <td><Input type="text" id="name" value={assetName} onChange={assetNameChangeHandler} onBlur={updateAssetDataHandler}/></td>
            <td><Input type="number" id="amount" value={assetAmount} onChange={assetAmountChangeHandler} onBlur={updateAssetDataHandler}/></td>
        </tr>
    } else {
        content = <Popover trigger="click" placement="topLeft" content={popoverContent}>
            <tr>
                <td>{assetName}</td>
                <td>{Number.parseFloat(props.assetData.amount).toFixed(2)}</td>
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