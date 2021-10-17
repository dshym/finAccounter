import * as firebaseActions from './firebaseActionTypes';
import * as assetsActions from './assets';
import * as incomeActions from './income';
import * as transactionsActions from './transactions';

export const setData = (userData) => {
    return {
        type: firebaseActions.SET_DATA,
        userData: userData
    }
}

export const saveData = (userId, userData, token) => {
    return async dispatch => {
        try {
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
        } catch (e) {
            console.log(e);
        }
    }
}

export const getData = (userId, token) => {
    return async dispatch => {
        try {
            fetch(`https://fin-accounter-default-rtdb.firebaseio.com/users/${userId}.json?auth=${token}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                return response.json();
            }).then(data => {
                dispatch(assetsActions.setCountries(data.userData.assets.countries));
                dispatch(incomeActions.setIncomes(data.userData.income.incomes));
                dispatch(transactionsActions.setTransactions(data.userData.transactions));
            });
        } catch (e) {
            console.log(e);
        }

    }
}

