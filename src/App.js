import React, { useEffect } from 'react';
import './App.css';

import { useDispatch } from 'react-redux';
import * as currencyActions from './store/actions/currencies';
import * as assetsActions from './store/actions/assets';
import * as incomeActions from './store/actions/income';
import * as transactionsActions from './store/actions/transactions';


import Navigation from './navigation/navigation';
import MainLayout from './Layout/Layout';
import NavigationSwitch from './navigation/navigationSwitch';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
         dispatch(currencyActions.fetchCurrencies());
         const jsonData = localStorage.getItem('UserData');
         const userData = JSON.parse(jsonData);
         if(!userData){
             return;
         }
         dispatch(currencyActions.setCurrenciesFromStorage(userData.currencies));
         dispatch(assetsActions.setCountries(userData.assets.countries));
         dispatch(incomeActions.setIncomes(userData.income.incomes));
         dispatch(transactionsActions.setTransactions(userData.transactions));
    },[dispatch]);


  return (
    <div className="App">
        <MainLayout mainContent={<NavigationSwitch />}>
            <Navigation />
        </MainLayout>
    </div>
  );
}

export default App;
