import getAllCountries from "../services/apiService";
import { Countries, RawCountry } from "../types/countries";

const parseCountriesData = async (): Promise<Countries[]> => {
  try {
    const response: RawCountry[] = await getAllCountries();
    const countriesData: Countries[] = response.map((country) => ({
      name: country.name?.common || "N/A",
      languages: country.languages ? Object.values(country.languages) : ["N/A"],
      currencyCode: country.currencies
        ? Object.keys(country.currencies)
        : ["N/A"],
      currencies: country.currencies
        ? Object.values(country.currencies).map((currency) => currency.name)
        : ["N/A"],
      capital: country.capital ? country.capital[0] : "N/A",
      population: country.population ? country.population : 0,
      flag: country.flags?.png || "N/A",
    }));
    return countriesData;
  } catch (error) {
    console.log(`Couldn't fetch countries ${error}`);
    return [];
  }
};

export default parseCountriesData;
