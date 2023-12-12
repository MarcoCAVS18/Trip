// CurrencyContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [conversionRates, setConversionRates] = useState({});

  useEffect(() => {
    const fetchConversionRates = async () => {
      try {
        const response = await axios.get('https://open.er-api.com/v6/latest');
        setConversionRates(response.data.rates);
      } catch (error) {
        console.error('Error fetching conversion rates:', error);
      }
    };

    fetchConversionRates();
  }, []);

  const updateConversionRates = async (baseCurrency) => {
    try {
      const response = await axios.get(`https://open.er-api.com/v6/latest/${baseCurrency}`);
      setConversionRates(response.data.rates);
    } catch (error) {
      console.error('Error fetching updated conversion rates:', error);
      throw error;
    }
  };

  return (
    <CurrencyContext.Provider value={{ conversionRates, updateConversionRates }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  return useContext(CurrencyContext);
};
