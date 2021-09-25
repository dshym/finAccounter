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
            const countryIndex = state.countries.findIndex(country => country.id === action.countryData.id);
            const countriesList = [...state.countries];
            countriesList[countryIndex].name = action.countryData.newName;
            return {
                countries: countriesList
            }
        case actionType.ADD_ASSET:
            const newAsset = {
                id: action.assetData.id,
                name: action.assetData.name,
                amount: action.assetData.amount,
            };
            const coutriesList1 = [...state.countries];
            const countryIndex1 = coutriesList1.findIndex(country => country.name === action.assetData.country);
            coutriesList1[countryIndex1].assets.push(newAsset);
            return {
                countries: coutriesList1
            }
        case actionType.DELETE_ASSET:
            const countriesList2 = [...state.countries];
            let countryIndex2 = countriesList2.findIndex(country => country.name === action.assetData.country);
            let assetIndex = countriesList2[countryIndex2].assets.findIndex(asset => asset.id === action.assetData.id);
            countriesList2[countryIndex2].assets.splice(assetIndex, 1);
            return {
                countries: countriesList2
            }
        default:
            return state;
    }
}

export default reducer;