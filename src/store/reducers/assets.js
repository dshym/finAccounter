import * as actionType from '../actions/assetsActionTypes';
//import { Country } from '../../Classes/Country';
const initialState = {
    countries: []
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SET_ASSETS:
            return {
                countries: action.countries
            }
        case actionType.ADD_COUNTRY:
            //const newCountry = new Country(action.countryData.id, action.countryData.name);
            const newCountry = {
                id: action.countryData.id,
                name: action.countryData.name,
                assets: [],
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
                currency: action.assetData.currency,
                rate: action.assetData.rate,
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
            countriesListForEditAsset[countryIndexForEditAsset].assets[assetIndexForEdit].currency =
                action.assetData.currency ? action.assetData.currency
                    : countriesListForEditAsset[countryIndexForEditAsset].assets[assetIndexForEdit].currency;
            countriesListForEditAsset[countryIndexForEditAsset].assets[assetIndexForEdit].rate =
                action.assetData.rate ? action.assetData.rate
                    : countriesListForEditAsset[countryIndexForEditAsset].assets[assetIndexForEdit].rate;
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
