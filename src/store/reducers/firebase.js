import * as firebaseActions from '../actions/firebaseActionTypes';

const initialState = {
    userData: null,
    firebaseLoading: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case firebaseActions.SET_DATA:
            return {
                ...state,
                userData: action.userData,
            }
        case firebaseActions.SET_FIREBASE_LOADING:
            return {
                ...state,
                firebaseLoading: !state.firebaseLoading,
            }
        default:
            return state;
    }
}

export default reducer;
