const baseURL = "https://api.coingecko.com/api/v3";
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

function getFromCache<T>(key: string): T | null {
  const cachedItem = localStorage.getItem(key);
  if (cachedItem) {
    const { data, timestamp }: CacheItem<T> = JSON.parse(cachedItem);
    if (Date.now() - timestamp < CACHE_DURATION) {
      return data;
    }
  }
  return null;
}

function setToCache<T>(key: string, data: T): void {
  const cacheItem: CacheItem<T> = {
    data,
    timestamp: Date.now(),
  };
  localStorage.setItem(key, JSON.stringify(cacheItem));
}

export async function FetchGlobalData(): Promise<any> {
  const cacheKey = 'globalData';
  const cachedData = getFromCache<any>(cacheKey);
  
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await fetch(`${baseURL}/global`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (!result.data) {
      throw new Error("API response does not contain `data` property.");
    }

    setToCache(cacheKey, result.data);
    return result.data;
  } catch (error) {
    console.error("Failed to fetch global data:", error);
    return null;
  }
}

export async function FetchTrendingData(): Promise<any> {
  const cacheKey = 'trendingData';
  const cachedData = getFromCache<any>(cacheKey);
  
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await fetch(`${baseURL}/search/trending`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (!result || !result.coins) {
      throw new Error("API response does not contain `coins` property.");
    }

    const data = { coins: result.coins };
    setToCache(cacheKey, data);
    return data;
  } catch (error) {
    console.error("Failed to fetch trending coins data:", error);
    return null;
  }
}

interface Coin {
  coin_id: string;
  symbol: string;
  image: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
}

export async function FetchTopGainers(): Promise<any> {
  const cacheKey = 'topGainers';
  const cachedData = getFromCache<any>(cacheKey);
  
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await fetch(`${baseURL}/coins/markets?vs_currency=usd&order=percent_change_24h_desc`);
    
    const data: Coin[] = await response.json();
    
    const sortedByGains = data.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);

    const topGainers = sortedByGains.slice(0, 5).map((coin) => ({
      name: coin.name,
      image: coin.image,
      symbol: coin.symbol,
      price: coin.current_price,
      percent_change_24h: coin.price_change_percentage_24h,
    }));

    setToCache(cacheKey, topGainers);
    return topGainers;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

export interface BitcoinData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: null;
  last_updated: string;
  sparkline_in_7d: {
    price: number[];
  };
}

export async function fetchBTCData(): Promise<BitcoinData | null> {
  const cacheKey = 'btcData';
  const cachedData = getFromCache<BitcoinData>(cacheKey);
  
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await fetch(
      `${baseURL}/coins/markets?vs_currency=usd&ids=bitcoin&sparkline=true`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const btcData = data[0] as BitcoinData;
    setToCache(cacheKey, btcData);
    return btcData;
  } catch (error) {
    console.error('Error fetching BTC data:', error);
    return null;
  }
}

