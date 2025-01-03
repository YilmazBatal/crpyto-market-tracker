import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

// CoinData Interface to define the structure of the coin data
interface CoinData {
  coin_id: number;
  name: string;
  symbol: string;
  thumb: string;
  data: {
    price: number;
    price_change_percentage_24h: {
      usd: number;
    };
  };
}

// TrendingCoinsProps to define the props structure
interface TrendingCoinsProps {
  name: string;
  coin_1: CoinData | null;
  coin_2: CoinData | null;
  coin_3: CoinData | null;
}

export function TrendingCard({name ,coin_1, coin_2, coin_3 }: TrendingCoinsProps) {
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
        {coins.map((myItem, index) => (
          <Link key={index} href={"/"} /*href={`/coin/${myItem?.slug}`} */>
            <div className="flex justify-between hover:bg-accent items-center rounded-2xl my-3 p-3">
              <div className="flex items-center">
                <img
                  src={myItem?.thumb}
                  alt={myItem?.name}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div>{myItem?.name}</div>
              </div>
              <div className="flex items-center space-x-4">
                <div>${formatPrice(myItem?.data.price)}</div>
                <div
                  className={`${
                    myItem?.data.price_change_percentage_24h.usd > 0
                      ? "text-up"
                      : "text-down"
                  } flex items-center`}
                >
                  {myItem?.data.price_change_percentage_24h.usd > 0 ? (
                    <ChevronUp height={18} />
                  ) : (
                    <ChevronDown height={18} />
                  )}
                  {myItem?.data.price_change_percentage_24h.usd.toFixed(2)}%{" "}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
