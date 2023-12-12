// CurrencySelector.js
import React from 'react';

function CurrencySelector({ currency, onCurrencyChange }) {
  return (
    <select
      value={currency}
      onChange={(e) => onCurrencyChange(e.target.value)}
      className="border p-2 rounded w-full"
    >
      <option value="AUD">AUD</option>
      <option value="USD">USD</option>
    </select>
  );
}

export default CurrencySelector;
