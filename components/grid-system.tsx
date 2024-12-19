"use client";

import React from "react";
import { TrendingCard } from "./marketoverview/trending-card";
import { TopGainerCard } from "./marketoverview/top-gainer-card";
import { MetricCard } from "./marketoverview/metric-card";
import { BitcoinChart } from "./marketoverview/bitcoin-chart";
import FearAndGreedIndex from "./FearAndGreedIndex";
import DominanceCard from "./dominance-card";
import { formatPrice } from "@/lib/utils";
import { CurrencyList } from "./currency-list";

interface MarketData {
  data: {
    market_cap_change_percentage_24h_usd: number;
    total_market_cap: {
      usd: number;
    };
    total_volume: {
      usd: number;
    };
    market_cap_percentage: {
      ada: number;
      bnb: number;
      btc: number;
      doge: number;
      eth: number;
      sol: number;
      steth: number;
      usdc: number;
      usdt: number;
      xrp: number;
    };
  };
  trending: {
    coins: {
      item: {
        id: string;
        coin_id: number;
        name: string;
        symbol: string;
        thumb: string;
        small: string;
        slug: string;
        data: {
          price: number;
          price_change_percentage_24h: {
            usd: number;
          };
        };
      };
    }[];
  };
  gainer: {
    name: string;
    symbol: string;
    image: string;
    price: number;
    percent_change_24h: number;
  }[];
  loaded: boolean;
}

export default function GridSystem({
  data,
  trending,
  gainer,
  loaded,
}: MarketData) {
  const MarketCapData = {
    market_data: data.total_market_cap.usd,
    market_data_change: data.market_cap_change_percentage_24h_usd,
    name: "Market Cap (7d)",
  };

  const MarketVolumeData = {
    market_data: data.total_volume.usd,
    market_data_change: data.market_cap_change_percentage_24h_usd,
    name: "Volume (7d)",
  };

  const MarketDominanceData = {
    btc_dom: data.market_cap_percentage.btc,
    eth_dom: data.market_cap_percentage.eth,
    xrp_dom: data.market_cap_percentage.xrp,
    usdt_dom: data.market_cap_percentage.usdt,
    sol_dom: data.market_cap_percentage.bnb,
    bnb_dom: data.market_cap_percentage.sol,
    doge_dom: data.market_cap_percentage.doge,
    ada_dom: data.market_cap_percentage.ada,
    steth_dom: data.market_cap_percentage.steth,
    usdc_dom: data.market_cap_percentage.usdc,
  };

  const TrendingCoins = {
    name: "Trending Coins 🔥",
    coin_1: trending?.coins?.[0]?.item
      ? {
          coin_id: trending.coins[0].item.coin_id,
          name: trending.coins[0].item.name,
          symbol: trending.coins[0].item.symbol,
          thumb: trending.coins[0].item.thumb,
          data: {
            price: trending.coins[0].item.data.price,
            price_change_percentage_24h: {
              usd: trending.coins[0].item.data.price_change_percentage_24h.usd,
            },
          },
        }
      : null,

    coin_2: trending?.coins?.[1]?.item
      ? {
          coin_id: trending.coins[1].item.coin_id,
          name: trending.coins[1].item.name,
          symbol: trending.coins[1].item.symbol,
          thumb: trending.coins[1].item.thumb,
          data: {
            price: trending.coins[1].item.data.price,
            price_change_percentage_24h: {
              usd: trending.coins[1].item.data.price_change_percentage_24h.usd,
            },
          },
        }
      : null,

    coin_3: trending?.coins?.[2]?.item
      ? {
          coin_id: trending.coins[2].item.coin_id,
          name: trending.coins[2].item.name,
          symbol: trending.coins[2].item.symbol,
          thumb: trending.coins[2].item.thumb,
          data: {
            price: trending.coins[2].item.data.price,
            price_change_percentage_24h: {
              usd: trending.coins[2].item.data.price_change_percentage_24h.usd,
            },
          },
        }
      : null,
  };

  const TopGainerCoins = {
    name: "Top Gainers 🚀",
    coin_1: gainer[0] || null,
    coin_2: gainer[1] || null,
    coin_3: gainer[2] || null,
  };

  return (
    <section className="pt-5">
      <div>
        {/* Home Page Title */}
        <span className="text-4xl font-bold text-primary">
          {" "}
          Cryptocurrency Prices by Market Cap{" "}
        </span>
        <p className="text-muted my-4">
          The global cryptocurrency market cap today is{" "}
          <span className="font-bold">
            {formatPrice(data.total_market_cap.usd)}$
          </span>
          , a{" "}
          <span
            className={data.market_cap_change_percentage_24h_usd > 0 ? "text-up font-bold" : "text-down font-bold"}
          >
            {data.market_cap_change_percentage_24h_usd.toFixed(2)}%
          </span>{" "}
          change in the last 24 hours.{" "}
          <span className="underline">Read more</span>
        </p>

        {/* Home Page Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-4 space-y-5 h-full flex flex-col justify-center">
            <MetricCard data={MarketCapData} />
            <MetricCard data={MarketVolumeData} />
          </div>
          <div className="lg:col-span-4 space-y-5 h-full flex flex-col justify-center">
            <TrendingCard {...TrendingCoins} />
          </div>
          <div className="lg:col-span-4 space-y-5 h-full flex flex-col justify-center">
            <TopGainerCard {...TopGainerCoins} />
          </div>
          <div className="lg:col-span-6 space-y-5 h-full flex flex-col justify-center">
            <BitcoinChart />
          </div>
          <div className="lg:col-span-3 space-y-5 h-full flex flex-col justify-center">
            <FearAndGreedIndex />
          </div>
          <div className="lg:col-span-3 space-y-5 h-full flex flex-col justify-center">
            <DominanceCard data={MarketDominanceData} />
          </div>
        </div>
      </div>
    </section>
  );
}
