import axios from 'axios';

const getAllCountries = async () => {
  const response = await axios.get('https://restcountries.com/v3.1/all');
  return response.data;
};

export default getAllCountries;
