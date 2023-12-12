// ConversionResult.js
import React from 'react';

// Importa el mapeo de banderas
import { currencyFlagMap } from './CurrencyCard'; // Asegúrate de ajustar la ruta correcta

function ConversionResult({ convertedValues }) {
  return (
    <div className="mt-4">
      {Object.entries(convertedValues).map(([currency, value]) => (
        <div key={currency} className="flex items-center mb-2">
          {/* Aquí asumimos que las imágenes tienen nombres específicos en la carpeta `src/images` */}
          <img src={currencyFlagMap[currency]} alt={`${currency} Flag`} className="w-6 h-6 mr-2" />
          <p className="ml-auto">{value}</p>
        </div>
      ))}
    </div>
  );
}

export default ConversionResult;
