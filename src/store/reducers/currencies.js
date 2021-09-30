import * as currenciesActions from '../actions/currenciesActionTypes';
import CURRENCIES from "../../CURRENCIES";
const inititalState = {
    currencies: []
};

const reducer = (state = inititalState, action) => {
    switch (action.type) {
        case currenciesActions.SET_CURRENCIES:
            const currencies = action.currencies.filter(currency => {
                if(currency.cc === CURRENCIES.dollar.name || currency.cc === CURRENCIES.zloty.name) {
                    return true;
                }
                return false;
            });
            return {
                currencies: currencies
            }
        default:
            return state;
    }
}

export default reducer;
