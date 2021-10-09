import * as firebaseActions from './firebaseActionTypes';

export const setLoading = () => {
    return {
        type: firebaseActions.SET_DATA
    }
}

export const setData = (userData) => {
    return {
        type: firebaseActions.SET_DATA,
        userData: userData
    }
}

export const saveData = (userId, userData, token) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading());
            const response = fetch(`https://fin-accounter-default-rtdb.firebaseio.com/users/${userId}.json?auth=${token}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userData: userData
                })
            });
            const res = (await response).json();
            res.then(data => {
                console.log(data);
            })
            dispatch(setLoading());
        } catch (e) {
            console.log(e);
            dispatch(setLoading());
        }
    }
}

export const getData = (userId, token) => {
    return async dispatch => {
        try {
            const response = fetch(`https://fin-accounter-default-rtdb.firebaseio.com/users/${userId}.json?auth=${token}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const jsonData = (await response).json();
            jsonData.then(data => {
                console.log(data);
            })
            dispatch(setLoading());
        } catch (e) {
            console.log(e);
            dispatch(setLoading());
        }
    }
}
