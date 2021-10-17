import * as authActionTypes from '../actions/authActionTypes';

const initialState = {
    token: null,
    userId: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case authActionTypes.AUTHENTICATE:
            return {
                token: action.userData.token,
                userId: action.userData.userId,
            };
        case authActionTypes.LOGOUT:
            return initialState;
        default:
            return state;
    }
}

export default reducer;
