"use client";

import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Item } from "@radix-ui/react-dropdown-menu";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  MoveRight,
} from "lucide-react";

interface DominanceData {
  data: {
    btc_dom: number;
    eth_dom: number;
    xrp_dom: number;
    usdt_dom: number;
    sol_dom: number;
    bnb_dom: number;
    doge_dom: number;
    ada_dom: number;
    steth_dom: number;
    usdc_dom: number;
  };
}

export default function DominanceCard({ data }: DominanceData) {
  const currencyIcons: { [key: string]: string } = {
    btc_dom:
      "https://assets.coingecko.com/coins/images/1/standard/bitcoin.png?1696501400", // Path to Bitcoin icon
    eth_dom:
      "https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628", // Path to Ethereum icon
    xrp_dom:
      "https://assets.coingecko.com/coins/images/44/standard/xrp-symbol-white-128.png?1696501442", // Path to Ripple icon
    usdt_dom:
      "https://assets.coingecko.com/coins/images/325/standard/Tether.png?1696501661", // Path to Tether icon
    sol_dom:
      "https://assets.coingecko.com/coins/images/4128/standard/solana.png?1718769756", // Path to Solana icon
    bnb_dom:
      "https://assets.coingecko.com/coins/images/825/standard/bnb-icon2_2x.png?1696501970", // Path to Binance Coin icon
    doge_dom:
      "https://assets.coingecko.com/coins/images/5/standard/dogecoin.png?1696501409", // Path to Dogecoin icon
    ada_dom:
      "https://assets.coingecko.com/coins/images/975/standard/cardano.png?1696502090", // Path to Cardano icon
    steth_dom:
      "https://assets.coingecko.com/coins/images/13442/standard/steth_logo.png?1696513206", // Path to stETH icon
    usdc_dom:
      "https://assets.coingecko.com/coins/images/6319/standard/usdc.png?1696506694", // Path to USD Coin icon
  };

  const dominanceData: DominanceData = {
    data: {
      btc_dom: data.btc_dom,
      eth_dom: data.eth_dom,
      xrp_dom: data.xrp_dom,
      usdt_dom: data.usdt_dom,
      sol_dom: data.sol_dom,
      bnb_dom: data.bnb_dom,
      doge_dom: data.doge_dom,
      ada_dom: data.ada_dom,
      steth_dom: data.steth_dom,
      usdc_dom: data.usdc_dom,
    },
  };

  // Get Top 5 Dominance
  const dominanceArray = Object.entries(dominanceData.data);
  const sortedDominance = dominanceArray.sort(([, a], [, b]) => b - a);
  const top5Dominance = sortedDominance.slice(0, 5);
  const top5Formatted = top5Dominance.map(([key, value]) => ({
    name: key,
    dominance: value.toFixed(2), // Format dominance to 2 decimal places
  }));

  const TopDomData = top5Formatted.map((item) => ({
    currency: item.name,
    dominance: item.dominance,
    icon:
      currencyIcons[item.name] ||
      "https://assets.coingecko.com/coins/images/1/standard/bitcoin.png?1696501400", // Default icon is BTC
  }));

  return (
    <Card className="flex flex-col rounded-3xl h-[250px] p-0 mb-0 ">
      <CardHeader className="items-center mb-0 pb-0">
        <CardTitle className="font-medium">Market Dominance</CardTitle>
        <div className="font-bold text-primary text-2xl">Top 3 Dominator</div>
      </CardHeader>
      <CardContent className="flex  items-center h-[100%] w-full mt-3 pb-0 mb-0">
        <div className="grid grid-cols-12 w-full ">
          <div className="col-span-12 flex items-center justify-between my-2 mx-5">
            
            <img src={TopDomData[0].icon} width={28} height={28} alt="" />{" "}
            <div className="flex">
              <span className="font-bold"> %{TopDomData[0].dominance} </span>
              <ChevronRight/>
            </div>
          </div>
          <div className="col-span-12 flex items-center justify-between my-2 mx-5">
            <img src={TopDomData[1].icon} width={28} height={28} alt="" />{" "}
            <div className="flex">
              <span className="font-bold"> %{TopDomData[1].dominance} </span>
              <ChevronRight />
            </div>
          </div>
          <div className="col-span-12 flex items-center justify-between my-2 mx-5">
            <img src={TopDomData[2].icon} width={28} height={28} alt="" />{" "}
            <div className="flex">
              <span className="font-bold"> %{TopDomData[2].dominance} </span>
              <ChevronRight />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
