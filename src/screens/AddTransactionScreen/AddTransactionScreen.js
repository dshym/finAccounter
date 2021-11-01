import React from 'react';
import classes from './AddTransactionScreen.module.css';
import AddTransactionForm from '../../components/Form/Form';
import { Divider } from 'antd';
import TransactionsHistory from "../../components/TransactionsHistory/TransactionsHistory";
const AddTransactionScreen = () => {
  return(
      <div className={classes.container}>
          <div className={classes.formColumn}>
              <Divider>Add Transaction</Divider>
              <AddTransactionForm />
          </div>
          <div className={classes.historyColumn}>
              <Divider>History</Divider>
              <TransactionsHistory />
          </div>
      </div>
  );
}

export default AddTransactionScreen;
