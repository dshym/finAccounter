import React, { useEffect } from 'react';
import './App.css';

import { useDispatch } from 'react-redux';
import * as currencyActions from './store/actions/currencies';

import Navigation from './navigation/navigation';
import MainLayout from './Layout/Layout';
import NavigationSwitch from './navigation/navigationSwitch';

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
         dispatch(currencyActions.fetchCurrencies());
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
