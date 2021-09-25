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

export const deleteAsset = (id, country) => {
    return {
        type: actionType.DELETE_ASSET,
        id: id,
        country: country
    }
}