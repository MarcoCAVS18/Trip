// AddCardButton.js
import React from 'react';

function AddCardButton({ onClick }) {
  return (
    <div
      className="bg-gray-500 text-white rounded-full w-12 h-12 flex items-center justify-center cursor-pointer"
      onClick={onClick}
    >
      +
    </div>
  );
}

export default AddCardButton;
