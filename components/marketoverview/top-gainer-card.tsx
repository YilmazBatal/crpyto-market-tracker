import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { ChevronDown, ChevronUp } from 'lucide-react';
import Link from "next/link";

interface Coin {
  name: string;
  symbol: string;
  image: string;
  price: number;
  percent_change_24h: number;  // Changed from price_change_percentage_24h
}

interface GainingCoinsProps {
  name: string;
  coin_1: Coin | null;
  coin_2: Coin | null;
  coin_3: Coin | null;
}

export function TopGainerCard({name, coin_1, coin_2, coin_3}: GainingCoinsProps) {
  const formatMarketCap = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value);

  // Collect all the coin data into an array for easier mapping
  const coins = [coin_1, coin_2, coin_3].filter(coin => coin !== null);

  return (
    <Card className="h-[100%] rounded-3xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 mb-2">
        <div className="flex justify-between items-center w-full">
          <p className="text-xl font-bold">{name}</p>
          <p className="text-muted underline">View more</p>
        </div>
      </CardHeader>
      <CardContent className="px-4">
        {coins.map((coin, index) => (
          <Link key={index} href={`/coin/${coin?.symbol}`}>
            <div className="flex justify-between hover:bg-accent items-center rounded-2xl my-3 p-3">
              <div className="flex items-center">
                <img
                  src={coin?.image}
                  alt={coin?.name}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div>{coin?.name}</div>
              </div>
              <div className="flex items-center space-x-4">
                <div>${formatPrice(coin?.price)}</div>
                {coin?.percent_change_24h != null && (
                  <div
                    className={`${
                      coin.percent_change_24h > 0
                        ? "text-up"
                        : "text-down"
                    } flex items-center`}
                  >
                    {coin.percent_change_24h > 0 ? (
                      <ChevronUp height={18} />
                    ) : (
                      <ChevronDown height={18} />
                    )}
                    {coin.percent_change_24h.toFixed(2)}%{" "}
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
