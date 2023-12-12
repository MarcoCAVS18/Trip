// CurrencyCard.js
import React, { useState, useEffect } from 'react';
import ConversionResult from './ConversionResult';
import Spinner from '../others/Spinner';
import { useCurrency } from '../../context/CurrencyContext';

import audFlag from '../../images/aud-flag.png';
import usdFlag from '../../images/usd-flag.png';
import myrFlag from '../../images/myr-flag.png';
import sgdFlag from '../../images/sgd-flag.png';
import khrFlag from '../../images/khr-flag.png';
import thbFlag from '../../images/thb-flag.png';
import idrFlag from '../../images/idr-flag.png';
import lakFlag from '../../images/lak-flag.png';
import vndFlag from '../../images/vnd-flag.png';

export const currencyFlagMap = {
  AUD: audFlag,
  USD: usdFlag,
  MYR: myrFlag,
  SGD: sgdFlag,
  KHR: khrFlag,
  THB: thbFlag,
  IDR: idrFlag,
  LAK: lakFlag,
  VND: vndFlag,
};

function CurrencyCard({ title, isFirstCard }) {
  const [amount, setAmount] = useState(0);
  const [selectedCurrency] = useState(isFirstCard ? 'AUD' : 'USD');
  const [convertedValues, setConvertedValues] = useState({});
  const [transformed, setTransformed] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  const { conversionRates, updateConversionRates } = useCurrency();

  const handleTransformClick = async () => {
    if (amount > 1) {
      try {
        setShowSpinner(true);

        await updateConversionRates(selectedCurrency);

        const baseConversionRate = conversionRates[selectedCurrency];

        const newConvertedValues = {
          MYR: (amount / baseConversionRate * conversionRates.MYR).toFixed(2),
          SGD: (amount / baseConversionRate * conversionRates.SGD).toFixed(2),
          KHR: (amount / baseConversionRate * conversionRates.KHR).toFixed(2),
          THB: (amount / baseConversionRate * conversionRates.THB).toFixed(2),
          IDR: (amount / baseConversionRate * conversionRates.IDR).toFixed(2),
          LAK: (amount / baseConversionRate * conversionRates.LAK).toFixed(2),
          VND: (amount / baseConversionRate * conversionRates.VND).toFixed(2),
        };

        setTimeout(() => {
          setShowSpinner(false);
        }, 3000);

        setConvertedValues(newConvertedValues);
        setTransformed(true);
      } catch (error) {
        console.error('Error fetching conversion rates:', error);
        setShowSpinner(false);
      }
    }
  };

  useEffect(() => {
    setAmount(0);
    setConvertedValues({});
    setTransformed(false);
  }, [isFirstCard]);

  return (
    <div className={`bg-white p-4 rounded border shadow-md mb-4 md:w-2/3 mx-auto flex flex-col items-center relative ${isFirstCard ? 'first-card' : ''}`}>
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden border-2 border-white mb-4">
          <img src={currencyFlagMap[selectedCurrency]} alt="Moneda Flag" className="w-full h-full object-cover" />
        </div>

        <h2 className="text-sm md:text-base font-light mb-1">Dólar</h2>
        <h2 className="text-lg md:text-xl font-bold mb-4">{title}</h2>

        <div className="mb-4">
          <input
            type="number"
            placeholder="Ingrese el monto"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>

        <button
          onClick={handleTransformClick}
          className={`${
            amount > 1 ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 cursor-not-allowed'
          } px-4 py-2 rounded`}
          disabled={amount <= 1}
        >
          Transformar
        </button>

        {transformed && (
          <h2 className="text-lg text-center font-bold mt-4">Valores Convertidos</h2>
        )}

        <ConversionResult convertedValues={convertedValues} />

        {showSpinner && <Spinner />}
      </div>
    </div>
  );
}

export default CurrencyCard;

