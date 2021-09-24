import React from 'react';

import { useDispatch } from 'react-redux';
import * as assetsActions from '../../store/actions/assets';

const AssetItem = (props) => {
    const dispatch = useDispatch();

    const deleteAssetHandler = () => {
        dispatch(assetsActions.deleteAsset(props.assetData.id));
    }
  return(
      <tr onClick={deleteAssetHandler}>
          <th>{props.assetData.name}</th>
          <th>{props.assetData.amount}</th>
      </tr>
  );
}

export default AssetItem;