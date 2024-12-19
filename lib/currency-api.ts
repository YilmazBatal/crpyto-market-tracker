const baseURL = "https://api.coingecko.com/api/v3";

export interface CurrencyData {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    price_change_percentage_24h: number;
}
const CACHE_KEY = 'topCurrencies';
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds

export async function fetchTopCurrencies(limit: number = 100): Promise<CurrencyData[]> {
  const cachedData = localStorage.getItem(CACHE_KEY);
  
  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);
    if (Date.now() - timestamp < CACHE_DURATION) {
      return data;
    }
  }

  try {
    const response = await fetch(
      `${baseURL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
    return data as CurrencyData[];
  } catch (error) {
    console.error('Error fetching top currencies:', error);
    return [];
  }
}
