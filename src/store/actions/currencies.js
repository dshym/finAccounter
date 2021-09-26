import * as currenciesActions from './currenciesActionTypes';
import axios from '../../axios-currencies';

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
            });
    }
}