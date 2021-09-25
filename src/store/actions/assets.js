import * as actionType from './assetsActionTypes';

export const addCountry = (id, countryName) => {
    return {
        type: actionType.ADD_COUNTRY,
        countryData: {id: id, name: countryName}
    }
}

export const deleteCountry = (id) => {
    return {
        type: actionType.DELETE_COUNTRY,
        id: id
    }
}

export const editCountry = (id, newName) => {
    return {
        type: actionType.EDIT_COUNTRY,
        countryData: {
            id: id,
            newName: newName
        }
    }
}

export const addAsset = (id, name, amount, country) => {
    return {
        type: actionType.ADD_ASSET,
        assetData: {
            id: id,
            name: name,
            amount: amount,
            country: country,
        }
    }
}

export const editAsset = (id, newName, newAmount, countryName) => {
    return {
        type: actionType.EDIT_ASSET,
        assetData: {
            id: id,
            name: newName,
            amount: newAmount,
            countryName: countryName
        }
    }
}

export const deleteAsset = (id, country) => {
    return {
        type: actionType.DELETE_ASSET,
        assetData: {
            id: id,
            country: country
        }
    }
}