import React, {useEffect, useState} from 'react';
import classes from './TransactionsHistory.module.css';

import { useSelector } from 'react-redux';

import { Timeline } from 'antd';

const TransactionsHistory = () => {
  const transactionStore = useSelector(state => state.transactions);
  const [transactionsList, setTransactionsList] = useState([]);

  useEffect(() => {
    let transList = [];
    if(transactionStore.incomeTransactions.length > 0 || transactionStore.outcomeTransactions.length > 0) {
      for (const transactionsListKey in transactionStore) {
        if(transactionStore[transactionsListKey] !== 0) {
          transactionStore[transactionsListKey].forEach(trans => {
            transList.push(trans);
          });
        }
      }
      transList.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      })
    }
    setTransactionsList(transList);
  }, [transactionStore])

  return(
      <Timeline className={classes.historyContainer}>
        <div className={classes.content}>
          {transactionsList.map(transaction => {
            return <Timeline.Item key={transaction.id} color={transaction.type === 'income' ? 'green' : 'red'}>
              <p>Name: {transaction.name}</p>
              <p>Amount: {transaction.amount + " " + transaction.currency}</p>
              <p>Date: {transaction.date}</p>
              <p>Category: {transaction.category}</p>
              <p>Addition Info: {transaction.additionalInfo}</p>
            </Timeline.Item>
          })}
        </div>

      </Timeline>
  );
}

export default TransactionsHistory;
