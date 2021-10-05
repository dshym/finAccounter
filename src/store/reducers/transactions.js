import * as transactionsActions from '../actions/transactionsActionTypes';

const initialState = {
  incomeTransactions: [],
  outcomeTransactions: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case transactionsActions.SET_TRANSACTIONS:
            return {
                incomeTransactions: action.transactions.incomeTransactions,
                outcomeTransactions: action.transactions.outcomeTransactions,
            }
        case transactionsActions.ADD_INCOME_TRANSACTION:
            const newIncome = {
                id: Math.random(),
                name: action.transactionData.name,
                category: action.transactionData.category,
                amount: action.transactionData.amount,
                additionalInfo: action.transactionData.additionalInfo,
                date: action.transactionData.date,
                accountId: action.transactionData.account,
                type: action.transactionData.type,
                currency: action.transactionData.currency,
            };
            return {
                ...state,
                incomeTransactions: state.incomeTransactions.concat(newIncome),
            };
        case transactionsActions.ADD_OUTCOME_TRANSCACTION:
            const newOutcome = {
                id: Math.random(),
                name: action.transactionData.name,
                category: action.transactionData.category,
                amount: action.transactionData.amount,
                additionalInfo: action.transactionData.additionalInfo,
                date: action.transactionData.date,
                accountId: action.transactionData.account,
                type: action.transactionData.type,
                currency: action.transactionData.currency,
            };
            return {
                ...state,
                outcomeTransactions: state.outcomeTransactions.concat(newOutcome),
            };
        default:
            return state
    }
}

export default reducer;
