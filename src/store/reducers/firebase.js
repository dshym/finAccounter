import * as firebaseActions from '../actions/firebaseActionTypes';

const initialState = {
    userData: null
}

const reducer = (state = initialState, action) => {
    if(action.type === firebaseActions.SET_DATA) {
        return {
            userData: action.userData
        }
    } else {
        return state;
    }
}

export default reducer;
