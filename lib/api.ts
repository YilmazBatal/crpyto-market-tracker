import { image } from "motion/react-client";

const baseURL = "https://api.coingecko.com/api/v3";

export async function FetchGlobalData(): Promise<any> {
  try {
    const response = await fetch(`${baseURL}/global`, {next : {revalidate : 3600}} );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the response JSON
    const result = await response.json();
    

    // Check if `data` exists in the response
    if (!result.data) {
      throw new Error("API response does not contain `data` property.");
    }

    return result.data; // Return the actual global data
  } catch (error) {
    console.error("Failed to fetch global data:", error);
    return null; // Ensure null is returned if there's an error
  }
}

export async function FetchTrendingData(): Promise<any> {
  try {
    const response = await fetch(`${baseURL}/search/trending`, { next: { revalidate: 3600 } });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    // console.log("Trending Data Result:", JSON.stringify(result, null, 2)); // Debug response

    // Accessing the 'coins' property in the result
    if (!result || !result.coins) {
      throw new Error("API response does not contain `coins` property.");
    }
    console.log("TOP TRENDS : ", result.coins);
    
    return { coins: result.coins };
  } catch (error) {
    console.error("Failed to fetch trending coins data:", error);
    return null; // Handle error gracefully
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
  try {
    const response = await fetch(`${baseURL}/coins/markets?vs_currency=usd&order=percent_change_24h_desc`, {next : {revalidate : 3600}} );
    
    const data: Coin[] = await response.json();
    
    // Sort the coins by percentage change in the last 24 hours (descending)
    const sortedByGains = data.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);

    // Output the top 5 gainers
    const topGainers = sortedByGains.slice(0, 5).map((coin) => ({
      name: coin.name,
      image: coin.image,
      symbol: coin.symbol,
      price: coin.current_price,
      percent_change_24h: coin.price_change_percentage_24h,

    }));
    console.log('Top Gainers:', topGainers);
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

export async function fetchBTCData(): Promise<BitcoinData | any> {
  try {
    const response = await fetch(
      `${baseURL}/coins/markets?vs_currency=usd&ids=bitcoin&sparkline=true` , { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data[0] as BitcoinData;
  } catch (error) {
    console.error('Error fetching BTC data:', error);
    return null;
  }
}


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

export async function fetchTopCurrencies(limit: number = 100): Promise<CurrencyData[]> {
  try {
    const response = await fetch(
      `${baseURL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`, { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as CurrencyData[];
  } catch (error) {
    console.error('Error fetching top currencies:', error);
    return [];
  }
}