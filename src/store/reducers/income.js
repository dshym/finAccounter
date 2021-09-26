import * as incomeActions from '../actions/incomeActionTypes';

const initialValue = {
    incomes: []
};

const reducer = (state = initialValue, action) => {
    switch (action.type) {
        case incomeActions.ADD_INCOME:
            const newIncome = {
                id: action.incomeData.id,
                name: action.incomeData.name,
                amount: action.incomeData.amount,
                currency: action.incomeData.currency
            }
            return {
                incomes: state.incomes.concat(newIncome)
            }
        case incomeActions.EDIT_INCOME:
            const incomesListForEdit = [...state.incomes];
            const incomeIndexForEdit = state.incomes.findIndex(income => income.id === action.incomeData.id);
            incomesListForEdit[incomeIndexForEdit].name = action.incomeData.name;
            incomesListForEdit[incomeIndexForEdit].amount = action.incomeData.amount;
            incomesListForEdit[incomeIndexForEdit].currency = action.incomeData.currency;
            return {
                incomes: incomesListForEdit
            }
        case incomeActions.DELETE_INCOME:
            return {
                incomes: state.incomes.filter(income => income.id !== action.id)
            }
        default:
            return state
    }
}

export default reducer;