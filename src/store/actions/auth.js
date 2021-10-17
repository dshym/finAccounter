import * as authActionTypes from './authActionTypes';
import * as firebaseActions from './firebase';

import { firebaseConfig } from '../../env';

export const authenticate = (userId, token) => {
    return {
        type: authActionTypes.AUTHENTICATE,
        userData: {
            userId: userId,
            token: token,
        }
    }
}

export const setLoading = () => {
    return {
        type: authActionTypes.SET_AUTH_LOADING,
    }
}

export const setError = (error) => {
    return {
        type: authActionTypes.SET_ERROR,
        error: error,
    }
}

export const signUp = (email, password) => {
    return async dispatch => {
        dispatch(setError(''));
        dispatch(setLoading()); //set loading to true;
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseConfig.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
        );
        if(!response.ok) {
            const responseData = await response.json();
            const errorMessage = responseData.error.message;
            dispatch(setError(errorMessage));
            dispatch(setLoading()); //set loading to false;
            return;
        } else {
            const resData = await response.json();
            dispatch(authenticate(resData.localId, resData.idToken));
            dispatch(setLoading());
        }

        // if(!response.ok) {
        //     const errorResData = await response.json();
        //     const errorId = errorResData.error.message;
        //     let message = 'Something went wrong.';
        //     if(errorId === 'EMAIL_EXISTS') {
        //         message = 'This email exists already.';
        //     }
        //     throw new Error(message);
        // }
    }
}

export const login = (email, password) => {
    return async dispatch => {
        dispatch(setError(''));
        dispatch(setLoading());
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseConfig.apiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
        );

        if(!response.ok) {
            const responseData = await response.json();
            const errorMessage = responseData.error.message;
            dispatch(setError(errorMessage));
            dispatch(setLoading());
            return;
        } else {
            const responseData = await response.json();
            dispatch(authenticate(responseData.localId, responseData.idToken));
            dispatch(firebaseActions.getData(responseData.localId, responseData.idToken));
            dispatch(setLoading());
        }

        // if(!response.ok) {
        //     const errorResData = await response.json();
        //     const errorId = errorResData.error.message;
        //     let message = 'Something went wrong.';
        //     if(errorId === 'EMAIL_NOT_FOUND') {
        //         message = 'This email could not be found.';
        //     } else if (errorId === 'INVALID_PASSWORD') {
        //         message = 'Invalid password.';
        //     }
        //     throw new Error(message);
        // }
    };
};

export const logout = () => {
    return {
        type: authActionTypes.LOGOUT
    }
}
