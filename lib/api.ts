const baseURL = "https://api.coingecko.com/api/v3";
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds

// ****************** CACHING ******************

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

const cache: Record<string, CacheItem<any>> = {};

function getFromCache<T>(key: string): T | null {
  const cachedItem = cache[key];
  if (cachedItem && Date.now() - cachedItem.timestamp < CACHE_DURATION) {
    return cachedItem.data;
  }
  return null;
}

function setToCache<T>(key: string, data: T): void {
  cache[key] = {
    data,
    timestamp: Date.now(),
  };
}

// ****************** MARKET DATA ******************

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

// ****************** TRENDING  ******************

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

// ****************** TOP GAINERS ******************

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


// ****************** BTC DATA ******************

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

// ****************** DETAILS ******************

export interface CryptoDetailData {
  id: string;
  symbol: string;
  name: string;
  image: {
    large: string;
  };
  market_data: {
    current_price: {
      usd: number;
    };
    price_change_percentage_24h: number;
    market_cap: {
      usd: number;
    };
    total_volume: {
      usd: number;
    };
    high_24h: {
      usd: number;
    };
    low_24h: {
      usd: number;
    };
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
  };
  description: {
    en: string;
  };
}

export async function fetchCryptoDetail(id: string): Promise<CryptoDetailData | null> {
  const cacheKey = `cryptoDetail_${id}`;
  const cachedData = getFromCache<CryptoDetailData>(cacheKey);
  
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await fetch(`${baseURL}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    setToCache(cacheKey, data);
    return data as CryptoDetailData;
  } catch (error) {
    console.error(`Error fetching detail data for ${id}:`, error);
    return null;
  }
}
