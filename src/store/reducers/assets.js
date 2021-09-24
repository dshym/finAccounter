import * as actionType from '../actions/assetsActionTypes';

const initialState = {
    assets: []
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_ASSET:
            const newAsset = {
                id: action.assetData.id,
                name: action.assetData.name,
                amount: action.assetData.amount,
            };
            return {
                assets: state.assets.concat(newAsset)
            }
        case actionType.DELETE_ASSET:
            return {
                assets: state.assets.filter(item => item.id !== action.id)
            }
        default:
            return state;
    }
}

export default reducer;