import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { initializeApp } from "firebase/app";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import assetsReducer from './store/reducers/assets';
import incomeReducer from './store/reducers/income';
import currenciesReducer from './store/reducers/currencies';
import transactionReducer from './store/reducers/transactions';
import authReducer from './store/reducers/auth';
import { firebaseConfig } from './env';
import App from './App';
import reportWebVitals from './reportWebVitals';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    assets: assetsReducer,
    income: incomeReducer,
    currencies: currenciesReducer,
    transactions: transactionReducer,
    auth: authReducer,
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
const app = initializeApp(firebaseConfig);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


