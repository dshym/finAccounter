import React from 'react';
import classes from './AddTransactionScreen.module.css';
import AddTransactionForm from '../components/Form/Form';
import { Divider } from 'antd';
const AddTransactionScreen = () => {
  return(
      <div className={classes.container}>
          <Divider>Add transaction</Divider>
        <AddTransactionForm />
      </div>
  );
}

export default AddTransactionScreen;
