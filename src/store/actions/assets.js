import * as actionType from './assetsActionTypes';

export const addAsset = (id, name, amount) => {
    return {
        type: actionType.ADD_ASSET,
        assetData: {
            id: id,
            name: name,
            amount: amount,
        }
    }
}

export const deleteAsset = (id) => {
    return {
        type: actionType.DELETE_ASSET,
        id: id
    }
}