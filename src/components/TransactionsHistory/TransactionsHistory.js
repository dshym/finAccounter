import React, {useState, useEffect} from 'react';
import classes from './TransactionsHistory.module.css';

import { useSelector } from 'react-redux';

import { Timeline } from 'antd';

const TransactionsHistory = () => {
  const [history, setHistory] = useState([]);

  const transactionStore = useSelector(state => state.transactions);

  useEffect(() => {
    const transactionsList = [];
    for (const transactionsListKey in transactionStore) {
      transactionStore[transactionsListKey].forEach(trans => {
        transactionsList.push(trans);
      });
    }
    transactionsList.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    })
    setHistory(transactionsList);
  },[transactionStore]);

  return(
      <Timeline className={classes.historyContainer}>
        <div className={classes.content}>
          {history.map(transaction => {
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
