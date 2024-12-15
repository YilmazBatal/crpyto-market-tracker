'use client';

import GridSystem from "@/components/grid-system";
import GridSystemSkeleton from "@/components/grid-system-skeleton";
import { FetchGlobalData } from "@/lib/api";
import { useEffect, useState } from "react";

export default function Home() {
  // const CACHE_KEY = "globalDataCache";
  // const CACHE_TIME = 15 * 60 * 1000; // 15 minutes in milliseconds
  
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); 


  console.log("SFSAFSAFASFA");
  
  useEffect(() => {
    async function loadData() {
      setLoading(true);
  
      console.log("ASDBSAHJNFSAM");
      
      try {
        // Fetch new data if cache is invalid
        const globalData = await FetchGlobalData();
        
        if (!globalData) throw new Error("API returned null data.");
        
        setData({...globalData, loading});
      } catch (error) {

        console.error(error);
        
      } finally {
        setLoading(false);
      }
      
    }
  
    loadData();
  }, []);

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-b from-gradient via-background to-transparent" />
      <div className="container mx-auto px-4 max-w-[1200px] relative">
        <h1 className="text-3xl font-bold mb-4">Global Market Data</h1>

        {error && <div className="text-red-500">{error}</div>}

        {data ? (
          <div>
            <p>
              Total Market Cap (USD):{" "}
              <span className="font-bold">
                ${data.total_market_cap?.usd.toLocaleString()}
              </span>
            </p>
            <p>
              Total Volume (USD):{" "}
              <span className="font-bold">
                ${data.total_volume?.usd.toLocaleString()}
              </span>
            </p>
            <p>
              Market Dominance:{" "}
              <span className="font-bold">
                BTC {data.market_cap_percentage?.btc.toFixed(2)}% / ETH{" "}
                {data.market_cap_percentage?.eth.toFixed(2)}%
              </span>
            </p>
            <GridSystem data={data} loaded />
          </div>
        ) : (
          <GridSystemSkeleton />
        )}

      </div>
    </div>
  );
}
