/* eslint-disable no-console */
import getAllCountries from '../services/apiService';
import { Countries, RawCountry } from '../types/countries';

const parseCountriesData = async (): Promise<Countries[]> => {
  try {
    const favoriteCountries = localStorage.getItem('favoriteCountries');
    const favoriteCountriesArray: string[] | undefined = favoriteCountries
      ? JSON.parse(favoriteCountries)
      : [''];
    const response: RawCountry[] = await getAllCountries();
    const countriesData: Countries[] = response.map((country) => ({
      name: country.name?.common || 'N/A',
      languages: country.languages ? Object.values(country.languages) : ['N/A'],
      currencyCode: country.currencies
        ? Object.keys(country.currencies)
        : ['N/A'],
      currencies: country.currencies
        ? Object.values(country.currencies).map((currency) => currency.name)
        : ['N/A'],
      capital: country.capital ? country.capital[0] : 'N/A',
      population: country.population ? country.population : 0,
      flag: country.flags?.png || 'N/A',
      favorite: favoriteCountriesArray
        ? favoriteCountriesArray.includes(country.name?.common)
        : false,
    }));
    return countriesData;
  } catch (error) {
    console.error(`Couldn't fetch countries ${error}`);
    return [];
  }
};

export default parseCountriesData;
