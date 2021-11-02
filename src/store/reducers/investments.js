import * as investmentsActions from '../actions/investmentsActionTypes';

const initialState = {
    investments: {} //{id: {id, name, amount, startDate, endDate}}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case investmentsActions.SET_INVESTMENTS:
            return {
                investments: action.investments
            }
        case investmentsActions.ADD_INVESMENT:
            return {
                investments: {...state.investments, [action.investment.id]: action.investment}
            }
        case investmentsActions.DELETE_INVESTMENT:
            const updatedInvestments = {...state.investments};
            delete updatedInvestments[action.id];
            return {
                investments: updatedInvestments
            }
        case investmentsActions.EDIT_INVESTMENT:
            const editedInvestments = {...state.investments};
            editedInvestments[action.id] = action.newInvestmentData;
            return {
                investments: editedInvestments
            }
        default:
            return state;
    }
}

export default reducer;
