import * as firebaseActions from '../actions/firebaseActionTypes';

const initialState = {
    userData: {},
    loading: false,
}

const reducer = (state = initialState, action) => {
    if(action.type === firebaseActions.SET_DATA) {
        return {
            userData: action.userData
        }
    }
    if(action.type === firebaseActions.SET_LOADING) {
        return {
            ...state,
            loading: !state.loading
        }
    } else {
        return state;
    }
}

export default reducer;
