import * as incomeActions from './incomeActionTypes';

export const setIncomes = (incomes) => {
    return {
        type: incomeActions.SET_INCOMES,
        incomes: incomes,
    }
}

export const addIncome = (id, name, amount, currency) => {
    return {
        type: incomeActions.ADD_INCOME,
        incomeData: {
            id: id,
            name: name,
            amount: amount,
            currency: currency
        }
    }
}

export const editIncome = (id, newName, newAmount, newCurrency) => {
    return {
        type: incomeActions.EDIT_INCOME,
        incomeData: {
            id: id,
            name: newName,
            amount: newAmount,
            currency: newCurrency,
        }
    }
}

export const deleteIncome = (id) => {
    return {
        type: incomeActions.DELETE_INCOME,
        id: id,
    }
}
