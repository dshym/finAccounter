import * as currenciesActions from './currenciesActionTypes';
import axios from '../../axios-currencies';

export const setCurrenciesFromStorage = (currencies) => {
    return {
        type: currenciesActions.SET_CURRENCIES_FROM_STORAGE,
        currencies: currencies,
    }
}

// export const setError = (error) => {
//     return {
//         type: currenciesActions.SET_ERROR,
//         error: error,
//     }
// }

export const setCurrencies = (currenciesArr) => {
    return {
        type: currenciesActions.SET_CURRENCIES,
        currencies: currenciesArr
    }
}

// export const setLoading = () => {
//     return {
//         type: currenciesActions.SET_CURRENCIES_LOADING
//     }
// }

export const fetchCurrencies = () => {
    return dispatch => {
        axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
            .then(response => {
                dispatch(setCurrencies(response.data));

            }).catch(error => {

                const jsonData = localStorage.getItem('UserData');
                if(jsonData) {
                    const userData = JSON.parse(jsonData);
                    setCurrenciesFromStorage(userData.currencies);
                }
            });
    };
}

