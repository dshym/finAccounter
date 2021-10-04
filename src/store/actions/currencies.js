import * as currenciesActions from './currenciesActionTypes';
import axios from '../../axios-currencies';

export const setCurrenciesFromStorage = (currencies) => {
    return {
        type: currenciesActions.SET_CURRENCIES_FROM_STORAGE,
        currencies: currencies,
    }
}

export const setCurrencies = (currenciesArr) => {
    return {
        type: currenciesActions.SET_CURRENCIES,
        currencies: currenciesArr
    }
}

export const fetchCurrencies = () => {
    return dispatch => {
        axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
            .then(response => {
                dispatch(setCurrencies(response.data));
            }).catch(e => {
                const jsonData = localStorage.getItem('UserData');
                const userData = JSON.parse(jsonData);
                setCurrenciesFromStorage(userData.currencies);
            });
    };
}

