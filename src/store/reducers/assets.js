import * as actionType from '../actions/assetsActionTypes';

const initialState = {
    countries: []
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_COUNTRY:
            const newCountry = {
                id: action.countryData.id,
                name: action.countryData.name,
                assets: []
            }
            const newState = {
                countries: state.countries.concat(newCountry)
            }
            return {
                ...newState
            }
        case actionType.DELETE_COUNTRY:
            return {
                countries: state.countries.filter(country => country.id !== action.id)
            }
        case actionType.EDIT_COUNTRY:
            const countryIndex = state.countries.findIndex(country =>
                country.id === action.countryData.id);
            const contriesListForEdit = [...state.countries];
            contriesListForEdit[countryIndex].name = action.countryData.newName;
            return {
                countries: contriesListForEdit
            }
        case actionType.ADD_ASSET:
            const newAsset = {
                id: action.assetData.id,
                name: action.assetData.name,
                amount: action.assetData.amount,
            };
            const countriesListForAddAsset = [...state.countries];
            const countryIndexForAddAsset = countriesListForAddAsset.findIndex(country =>
                country.name === action.assetData.country);
            countriesListForAddAsset[countryIndexForAddAsset].assets.push(newAsset);
            return {
                countries: countriesListForAddAsset
            }
        case actionType.EDIT_ASSET:
            const countriesListForEditAsset = [...state.countries];
            let countryIndexForEditAsset = countriesListForEditAsset.findIndex(country =>
                country.name === action.assetData.countryName);
            let assetIndexForEdit = countriesListForEditAsset[countryIndexForEditAsset].assets.findIndex(asset =>
                asset.id === action.assetData.id);
            countriesListForEditAsset[countryIndexForEditAsset].assets[assetIndexForEdit].name = action.assetData.name;
            countriesListForEditAsset[countryIndexForEditAsset].assets[assetIndexForEdit].amount = action.assetData.amount;
            return {
                countries: countriesListForEditAsset
            }
        case actionType.DELETE_ASSET:
            const countriesListForDeleteAsset = [...state.countries];
            let countryIndexForDeleteAsset = countriesListForDeleteAsset.findIndex(country =>
                country.name === action.assetData.country);
            let assetIndexForDelete = countriesListForDeleteAsset[countryIndexForDeleteAsset].assets.findIndex(asset =>
                asset.id === action.assetData.id);
            countriesListForDeleteAsset[countryIndexForDeleteAsset].assets.splice(assetIndexForDelete, 1);
            return {
                countries: countriesListForDeleteAsset
            }
        default:
            return state;
    }
}

export default reducer;