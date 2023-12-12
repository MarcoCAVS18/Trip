// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CurrencyProvider } from './context/CurrencyContext';

const root = document.getElementById('root');
ReactDOM.createRoot(root).render(
  <CurrencyProvider>
    <App />
  </CurrencyProvider>
);
