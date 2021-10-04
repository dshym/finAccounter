import * as transactionActions from './transactionsActionTypes';

export const setTransactions = (transactions) => {
  return {
      type: transactionActions.SET_TRANSACTIONS,
      transactions: transactions
  }
}

export const addTransaction = (type, transactionData) => {
    return {
        type: type,
        transactionData: transactionData
    }
}
