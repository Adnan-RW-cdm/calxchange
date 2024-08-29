// import axios from 'axios';

// const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';
// const EXCHANGE_RATE_API_BASE_URL = 'https://api.exchangerate-api.com/v4/latest';

// export const fetchCryptoRates = async () => {
//   try {
//     const response = await axios.get(`${COINGECKO_BASE_URL}/simple/price?ids=bitcoin,ethereum,litecoin&vs_currencies=usd`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching crypto rates:', error);
//     return {};
//   }
// };

// export const fetchCurrencyRates = async (baseCurrency = 'USD') => {
//   try {
//     const response = await axios.get(`${EXCHANGE_RATE_API_BASE_URL}/${baseCurrency}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching currency rates:', error);
//     return {};
//   }
// };






import axios from 'axios';

const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';
const EXCHANGE_RATE_API_BASE_URL = 'https://api.exchangerate-api.com/v4/latest';

// Fetching all cryptocurrencies
export const fetchAllCrypto = async () => {
  try {
    const response = await axios.get(`${COINGECKO_BASE_URL}/coins/list`);
    return response.data; // List of all cryptocurrencies
  } catch (error) {
    console.error('Error fetching all cryptocurrencies:', error);
    return [];
  }
};

// Fetching cryptocurrency rates
export const fetchCryptoRates = async (fiatCurrency = 'usd') => {
  try {
    const response = await axios.get(`${COINGECKO_BASE_URL}/simple/price?ids=bitcoin,ethereum,litecoin&vs_currencies=${fiatCurrency}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching crypto rates:', error);
    return {};
  }
};

// Fetching fiat currency rates
export const fetchCurrencyRates = async (baseCurrency = 'USD') => {
  try {
    const response = await axios.get(`${EXCHANGE_RATE_API_BASE_URL}/${baseCurrency}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching currency rates:', error);
    return {};
  }
};
