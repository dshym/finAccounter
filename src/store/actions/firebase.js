import * as firebaseActions from './firebaseActionTypes';
import * as assetsActions from './assets';
import * as incomeActions from './income';
import * as transactionsActions from './transactions';

import { openNotificationWithIcon } from '../../components/CustomNotification/CustomNotification';

export const setData = (userData) => {
    return {
        type: firebaseActions.SET_DATA,
        userData: userData
    }
}

export const setFirebaseLoading = () => {
    return {
        type: firebaseActions.SET_FIREBASE_LOADING,
    }
}

export const saveData = (userId, userData, token) => {
    return async dispatch => {
        dispatch(setFirebaseLoading());
        try {
            const response = await fetch(`https://fin-accounter-default-rtdb.firebaseio.com/users/${userId}.json?auth=${token}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userData: userData
                })
            });
            if(response.ok) {
                dispatch(setFirebaseLoading());
                openNotificationWithIcon('success', 'Data successfully saved on server', 'Success');
            }
        } catch (e) {
            openNotificationWithIcon('error', 'Failed to save data on server', 'An error accured');
            dispatch(setFirebaseLoading());
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
                if(data === null) {
                    return;
                }
                //handle undefined properties
                if(data.userData.assets.countries === 0) {
                    dispatch(assetsActions.setCountries([]));
                } else {
                    data.userData.assets.countries.forEach(country => {
                        if(country.assets === 0) {
                            country.assets = [];
                        }
                    });
                    dispatch(assetsActions.setCountries(data.userData.assets.countries));
                }

                if(Number.parseInt(data.userData.income.incomes) === 0) {
                    dispatch(incomeActions.setIncomes([]));
                } else {
                    dispatch(incomeActions.setIncomes(data.userData.income.incomes));
                }
                const transactions = {
                    incomeTransactions: data.userData.transactions.incomeTransactions === 0 ? [] : data.userData.transactions.incomeTransactions,
                    outcomeTransactions: data.userData.transactions.outcomeTransactions === 0 ? [] : data.userData.transactions.outcomeTransactions,
                }
                dispatch(transactionsActions.setTransactions(transactions));
            });
        } catch (e) {
            openNotificationWithIcon('error', 'An error accured while loading data from personal data', 'An error accured');
        }
    }
}

