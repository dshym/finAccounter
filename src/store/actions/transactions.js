import * as transactionActions from './transactionsActionTypes';

export const addTransaction = (type, transactionData) => {
    return {
        type: type,
        transactionData: transactionData
    }
}
