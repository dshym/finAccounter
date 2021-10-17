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

export const signUp = (email, password) => {
    return async dispatch => {
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
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = 'Something went wrong.';
            if(errorId === 'EMAIL_EXISTS') {
                message = 'This email exists already.';
            }
            throw new Error(message);
        }

        const resData = await response.json();
        dispatch(authenticate(resData.localId, resData.idToken));
    }
}

export const login = (email, password) => {
    return async dispatch => {

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
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = 'Something went wrong.';
            if(errorId === 'EMAIL_NOT_FOUND') {
                message = 'This email could not be found.';
            } else if (errorId === 'INVALID_PASSWORD') {
                message = 'Invalid password.';
            }
            throw new Error(message);
        }

        const resData = await response.json();
        dispatch(authenticate(resData.localId, resData.idToken));
        dispatch(firebaseActions.getData(resData.localId, resData.idToken));
    };
};

export const logout = () => {
    return {
        type: authActionTypes.LOGOUT
    }
}
