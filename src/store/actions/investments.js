import * as investmentActions from './investmentsActionTypes';


export const setInvestments = (investments) => {
    return {
        type: investmentActions.SET_INVESTMENTS,
        investments,
    }
}

export const addInvestment = (investment) => {
    return {
        type: investmentActions.ADD_INVESMENT,
        investment,
    }
}

export const deleteInvestment = (id) => {
  return {
      type: investmentActions.DELETE_INVESTMENT,
      id
  }
}

export const editInvestment = (id, newInvestmentData) => {
  return {
      type: investmentActions.EDIT_INVESTMENT,
      id,
      newInvestmentData,
  }
}
