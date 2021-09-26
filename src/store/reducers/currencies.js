import * as currenciesActions from '../actions/currenciesActionTypes';
import Currencies from "../../currencies/currencies";
const inititalState = {
    currencies: []
};

const reducer = (state = inititalState, action) => {
    switch (action.type) {
        case currenciesActions.SET_CURRENCIES:
            const currencies = action.currencies.filter(currency => {
                if(currency.cc === Currencies.dollar.name || currency.cc === Currencies.zloty.name) {
                    return true;
                }
            });
            return {
                currencies: currencies
            }
        default:
            return state;
    }
}

export default reducer;