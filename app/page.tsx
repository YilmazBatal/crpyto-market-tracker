'use client';

import GridSystem from "@/components/grid-system";
import GridSystemSkeleton from "@/components/grid-system-skeleton";
import { FetchGlobalData, FetchTrendingData, FetchTopGainers } from "@/lib/api";
import { useEffect, useState } from "react";

export default function Home() {
  // const CACHE_KEY = "globalDataCache";
  // const CACHE_TIME = 15 * 60 * 1000; // 15 minutes in milliseconds
  
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); 

  
  useEffect(() => {
    async function loadData() {
      setLoading(true);

      try {
        // Fetch new data if cache is invalid
        const [globalData, trendingData, gainerData] = await Promise.all([
          FetchGlobalData(),
          FetchTrendingData(),
          FetchTopGainers(),
        ]);
        
        if (!globalData || !trendingData) {
          throw new Error("One of the API responses returned null data.");
        }
        
        // Merge the two datasets into a single structure
        setData({
          global: globalData,
          trending: trendingData,
          gainer: gainerData,
        });
      } catch (error) {
        console.error(error);
        setError("Failed to fetch data.");
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
        <h1 className="text-3xl font-bold mb-4"> </h1>

        {error && <div className="text-red-500">{error}</div>}

        {data ? (
          
          <GridSystem data={data.global} trending={data.trending} gainer={data.gainer} loaded />
        ) : (
          <GridSystemSkeleton />
        )}

      </div>
    </div>
  );
}
