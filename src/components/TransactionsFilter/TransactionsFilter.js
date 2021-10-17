import React, { useState, useEffect } from "react";

import classes from './TransactionsFilter.module.css';

import { useSelector } from 'react-redux';
import {Select, Timeline} from "antd";

const {Option} = Select;

const TransactionsFilter = () => {;
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Choose category');
  const transactionStore = useSelector(state => state.transactions);

  const selectChangeHandler = (value) => {
    setSelectedCategory(value);
    if(value === 'Choose category') {
      return;
    }
    const filteredArr = [];
    for (const key in transactionStore) {
      transactionStore[key].forEach(transaction => {
        if(transaction.category === value) {
          filteredArr.push(transaction);
        }
      })
    }
    setFilteredTransactions(filteredArr);
  }

  const categoriesForSelect = [];
  if(transactionStore.incomeTransactions.length > 0 || transactionStore.outcomeTransactions.length > 0) {
    const categories = [];
    const uniqueCategories = new Set();

    for (const key in transactionStore) {
      transactionStore[key].forEach(transaction => {
        categories.push(transaction.category);
      });
    }
    categories.forEach(cat => {
      uniqueCategories.add(cat);
    });
    uniqueCategories.forEach(cat => {
      categoriesForSelect.push(cat);
    })
  }

  if(categoriesForSelect.length > 0) {

    return (
      <div>
        <strong><p>Transaction filter</p></strong>
        <Select defaultValue={selectedCategory} onChange={selectChangeHandler} className={classes.select}>
          {categoriesForSelect.map(category => {
            return <Option key={category} value={category}>{category}</Option>
          })}
        </Select>
        <Timeline className={classes.timelineContainer}>
          <div className={classes.content}>
            {filteredTransactions.map(transaction => {
              return <Timeline.Item key={transaction.id}>
                <p>Name: {transaction.name}</p>
                <p>Amount: {transaction.amount + " " + transaction.currency}</p>
                <p>Date: {transaction.date}</p>
                <p>Category: {transaction.category}</p>
                <p>Type: {transaction.type}</p>
                <p>Addition Info: {transaction.additionalInfo}</p>
              </Timeline.Item>
            })}
          </div>
        </Timeline>
      </div>
    );
  }

  return(
      <div>Add transactions</div>
  );
}

export default TransactionsFilter;
