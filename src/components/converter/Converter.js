// Converter.js
import React from 'react';
import CurrencySelector from './CurrencySelector';
import ConversionResult from './ConversionResult';

function Converter({
  currency,
  setCurrency,
  amount,
  setAmount,
  convertedValues,
  setConvertedValues,
}) {
  const handleCurrencyChange = (selectedCurrency) => {
    setCurrency(selectedCurrency);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  return (
    <div className="mb-4">
      <form className="flex flex-col items-center">
        <CurrencySelector
          currency={currency}
          onCurrencyChange={handleCurrencyChange}
        />
        <input
          type="number"
          placeholder="Ingrese el monto"
          value={amount}
          onChange={handleAmountChange}
          className="border p-2 rounded mt-2 w-full"
        />
      </form>
      <ConversionResult convertedValues={convertedValues} />
    </div>
  );
}

export default Converter;
