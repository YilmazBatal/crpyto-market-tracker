'use client'

import React from "react";
import { Skeleton } from "./ui/skeleton";
import { mockBTCdata, mockMarketCapData, mockMarketVolumeData, mockTrendingCoinData } from "../lib/generate-mock-data";
import { TrendingCard } from "./marketoverview/trending-card";
import { MetricCard } from "./marketoverview/metric-card";
import { BitcoinChart } from "./marketoverview/bitcoin-chart";
import FearAndGreedIndex from "./FearAndGreedIndex";
import DominanceCard from "./dominance-card";

interface MarketData {
  data : {
    market_cap_change_percentage_24h_usd	: number,
    total_market_cap : {
      usd : number
    },
    total_volume : {
      usd : number
    },
    market_cap_percentage : {
      btc : number,
      eth : number
    }
  },
  loaded : boolean
}

// Format Number
const formatNumber = (number: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(number);
};

export default function GridSystem( { data, loaded } : MarketData ) {
  const MarketCapData = {
    market_data : data.total_market_cap.usd,
    market_data_change : data.market_cap_change_percentage_24h_usd,
    name : "Market Cap (7d)"
  }

  const MarketVolumeData = {
    market_data : data.total_volume.usd,
    market_data_change : data.market_cap_change_percentage_24h_usd,
    name : "Volume (7d)"
  }
  

  return (
    <section>
        
        <div className="my-5">
          {/* Home Page Title */}
          <span className="text-4xl font-bold text-primary"> Cryptocurrency Prices by Market Cap </span>
          <p className="text-muted my-4">
            The global cryptocurrency market cap today is {" "}
            <span className="font-bold">{"formatNumber(marketData.marketCap)"}</span>, a{" "}
            <span className={'marketData.volumeChange >= 0 ? "text-up" : "text-down"'}>
              {'marketData.volumeChange.toFixed(2)'}%
            </span>{" "}
            change in the last 24 hours. <span className="underline">Read more</span>
          </p>

          {/* Home Page Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-4 space-y-5 h-full flex flex-col justify-center">
              <MetricCard data={MarketCapData}/>
              <MetricCard data={MarketVolumeData}/>
            </div>
            <div className="lg:col-span-4 space-y-5 h-full flex flex-col justify-center">
              <TrendingCard data={mockTrendingCoinData} name="Trending Coins 🔥" />
            </div>
            <div className="lg:col-span-4 space-y-5 h-full flex flex-col justify-center">
              <TrendingCard data={mockTrendingCoinData} name="Top Gainers 🚀"/>
            </div>
            <div className="lg:col-span-6 space-y-5 h-full flex flex-col justify-center">
              <BitcoinChart data={mockBTCdata} />
            </div>
            <div className="lg:col-span-3 space-y-5 h-full flex flex-col justify-center">
              <FearAndGreedIndex />
            </div>
            <div className="lg:col-span-3 space-y-5 h-full flex flex-col justify-center">
              <DominanceCard />
            </div>
          </div>
        </div>
    </section>
  );
}

