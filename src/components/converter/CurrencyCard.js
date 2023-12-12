// CurrencyCard.js
import React, { useState, useEffect } from 'react';
import ConversionResult from './ConversionResult';
import { useCurrency } from '../../context/CurrencyContext';
import Spinner from '../others/Spinner'; // Ajusta la ruta según la ubicación real del componente Spinner

// Importa las imágenes de las banderas
import audFlag from '../../images/aud-flag.png';
import usdFlag from '../../images/usd-flag.png';
import myrFlag from '../../images/myr-flag.png';
import sgdFlag from '../../images/sgd-flag.png';
import khrFlag from '../../images/khr-flag.png';
import thbFlag from '../../images/thb-flag.png';
import idrFlag from '../../images/idr-flag.png';
import lakFlag from '../../images/lak-flag.png';
import vndFlag from '../../images/vnd-flag.png';

// Mapea el código de moneda a la imagen de la bandera correspondiente
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
  const [convertedValues, setConvertedValues] = useState({});
  const [selectedCurrency, setSelectedCurrency] = useState(isFirstCard ? 'AUD' : 'USD');
  const [transformed, setTransformed] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  const { conversionRates, updateConversionRates } = useCurrency();

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
  };

  const handleTransformClick = async () => {
    if (amount > 1) {
      try {
        // Mostrar el Spinner al iniciar la transformación
        setShowSpinner(true);

        // Llamamos a la función para actualizar las tasas de cambio utilizando la moneda base (selectedCurrency)
        await updateConversionRates(selectedCurrency);

        // Lógica de transformación (simulada)
        const baseConversionRate = conversionRates[selectedCurrency];

        // Corregir el cálculo utilizando la moneda correcta
        const newConvertedValues = {
          MYR: (amount / baseConversionRate * conversionRates.MYR).toFixed(2),
          SGD: (amount / baseConversionRate * conversionRates.SGD).toFixed(2),
          KHR: (amount / baseConversionRate * conversionRates.KHR).toFixed(2),
          THB: (amount / baseConversionRate * conversionRates.THB).toFixed(2),
          IDR: (amount / baseConversionRate * conversionRates.IDR).toFixed(2),
          LAK: (amount / baseConversionRate * conversionRates.LAK).toFixed(2),
          VND: (amount / baseConversionRate * conversionRates.VND).toFixed(2),
        };

        // Ocultar el Spinner después de 3 segundos (ajusta según tu necesidad)
        setTimeout(() => {
          setShowSpinner(false);
        }, 3000);

        setConvertedValues(newConvertedValues);
        setTransformed(true);
      } catch (error) {
        console.error('Error fetching conversion rates:', error);
        // Asegurar que el Spinner se oculte incluso en caso de error
        setShowSpinner(false);
      }
    }
  };

  useEffect(() => {
    // Establecer valores iniciales al cargar o recargar la página
    setAmount(0);
    setConvertedValues({});
    setTransformed(false); // Asegurar que el estado "transformed" se restablezca al cargar o recargar la página
  }, [isFirstCard]);

  return (
    <div className={`bg-white p-4 rounded border shadow-md mb-4 md:w-2/3 mx-auto flex flex-col items-center relative ${isFirstCard ? 'first-card' : ''}`}>
      {/* Contenedor para centrar vertical y horizontalmente */}
      <div className="flex flex-col items-center">
        {/* Círculo con imagen sobre el borde superior */}
        <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden border-2 border-white mb-4">
          <img src={currencyFlagMap[selectedCurrency]} alt="Moneda Flag" className="w-full h-full object-cover" />
        </div>

        {/* Título con estilos de texto personalizados */}
        <h2 className="text-sm md:text-base font-light mb-1">Dólar</h2>
        <h2 className="text-lg md:text-xl font-bold mb-4">{title}</h2>

        {/* Input para el valor numérico */}
        <div className="mb-4">
          <input
            type="number"
            placeholder="Ingrese el monto"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Botón de transformación y resultados */}
        <button
          onClick={handleTransformClick}
          className={`${
            amount > 1 ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 cursor-not-allowed'
          } px-4 py-2 rounded`}
          disabled={amount <= 1}
        >
          Transformar
        </button>

        {/* Título "Valores Convertidos" visible solo cuando se ha transformado */}
        {transformed && (
          <h2 className="text-lg text-center font-bold mt-4">Valores Convertidos</h2>
        )}

        {/* Resultados de la transformación */}
        <ConversionResult convertedValues={convertedValues} />

        {/* Mostrar el Spinner cuando showSpinner es true */}
        {showSpinner && <Spinner />}
      </div>
    </div>
  );
}

export default CurrencyCard;
