import * as authActionTypes from '../actions/authActionTypes';

const initialState = {
    token: null,
    userId: null,
    authLoading: false,
    authError: ''
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case authActionTypes.AUTHENTICATE:
            return {
                ...state,
                token: action.userData.token,
                userId: action.userData.userId,
            };
        case authActionTypes.SET_ERROR:
            return {
                ...state,
                authError: action.error,
            }
        case authActionTypes.SET_AUTH_LOADING:
            return {
                ...state,
                authLoading: !state.authLoading
            }
        case authActionTypes.LOGOUT:
            return initialState;
        default:
            return state;
    }
}

export default reducer;
