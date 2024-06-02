import axios from 'axios';

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';

export const getCryptoPrices = async (ids, vs_currency = 'usd') => {
  const response = await axios.get(`${COINGECKO_API_URL}/simple/price`, {
    params: {
      ids: ids.join(','),
      vs_currencies: vs_currency
    }
  });
  return response.data;
};
