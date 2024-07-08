import React from 'react';
import { Countries } from '../types/countries';

interface Props {
  selectedCountry: Countries | null;
  setSelectedCountry: React.Dispatch<React.SetStateAction<Countries | null>>;
}

const CardComponent: React.FC<Props> = ({
  selectedCountry,
  setSelectedCountry,
}) => {
  if (!selectedCountry) {
    return null;
  }
  return (
    <div className="border border-gray-200 bg-white shadow-md rounded-lg p-4 relative">
      <button
        className="absolute top-2 right-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={() => setSelectedCountry(null)}
      >
        Close
      </button>
      <h2 className="text-xl font-semibold mb-2 text-center">
        {selectedCountry.name}
      </h2>
      <div className="flex justify-center mb-4">
        <img
          src={selectedCountry.flag}
          alt={`Flag of ${selectedCountry.name}`}
          className="w-auto h-40 rounded-lg shadow-md"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p>
            <strong>Capital:</strong> {selectedCountry.capital || 'N/A'}
          </p>
          <p>
            <strong>Population:</strong> {selectedCountry.population || 'N/A'}
          </p>
        </div>
        <div>
          <p>
            <strong>Languages:</strong>{' '}
            {selectedCountry.languages.join(', ') || 'N/A'}
          </p>
          <p>
            <strong>Currencies:</strong>{' '}
            {selectedCountry.currencies.join(', ') || 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
