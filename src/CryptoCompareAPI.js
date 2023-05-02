import axios from 'axios';
import { API_KEY } from './config';

const API_BASE_URL = 'https://min-api.cryptocompare.com/data/';

const CryptoCompareAPI = {
  // Get the current price for a single symbol.
  getPrice(symbol) {
    const url = `${API_BASE_URL}price?fsym=${symbol}&tsyms=USD&api_key=${API_KEY}`;
    return axios.get(url);
  },

  // Get the daily historical prices for a single symbol.
  getDailyHistoricalPrices(symbol, limit = 30) {
    const url = `${API_BASE_URL}v2/histoday?fsym=${symbol}&tsym=USD&limit=${limit}&api_key=${API_KEY}`;
    return axios.get(url);
  },

  // Get the current supply for a single symbol.
  getSupply(symbol) {
    const url = `${API_BASE_URL}supply?fsym=${symbol}&api_key=${API_KEY}`;
    return axios.get(url);
  },

  // Get the current total volume for a single symbol.
  getTotalVolume(symbol) {
    const url = `${API_BASE_URL}v2/totalsupply?fsym=${symbol}&api_key=${API_KEY}`;
    return axios.get(url);
  },
};

export default CryptoCompareAPI;
