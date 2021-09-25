import React from 'react';
import classes from './AssetItem.module.css';

import { useDispatch } from 'react-redux';
import * as assetsActions from '../../store/actions/assets';

import { Popover, Button } from 'antd';

const AssetItem = (props) => {
    const dispatch = useDispatch();

    const deleteAssetHandler = () => {
        dispatch(assetsActions.deleteAsset(props.assetData.id, props.countryName));
    }

    const content = <div className={classes.popover}>
        <Button>Edit</Button>
        <Button danger onClick={deleteAssetHandler}>Delete</Button>
    </div>

  return(
      <Popover trigger="click" placement="topLeft" content={content}>
          <tr>
              <th>{props.assetData.name}</th>
              <th>{props.assetData.amount}</th>
          </tr>
      </Popover>
  );
}

export default AssetItem;