import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

interface TrendingCardProps {
  name : string;
  data: {
    img: string;
    name: string;
    price: number;
    percentage_change: number;
  }[];
}

export function TrendingCard({ data, name }: TrendingCardProps) {
  const formatMarketCap = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value);

  return (
    <Card className="h-[100%] rounded-3xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 mb-2">
        <div className="flex justify-between items-center w-full">
          <p className="text-xl font-bold">{name}</p>
          <p className="text-muted underline">View more</p>
        </div>
      </CardHeader>
      <CardContent className="px-4">
        {data.map((item, index) => (
          <Link href={item.name}>
            <div
              key={index}
              className="flex justify-between hover:bg-accent items-center rounded-2xl my-3 p-3"
            >
              <div className="flex items-center">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div>{item.name}</div>
              </div>
              <div className="flex items-center space-x-4">
                <div>${item.price}</div>
                <div
                  className={`${item.percentage_change > 0 ? "text-up" : "text-down"} flex items-center`}
                >
                  {" "}

                  {item.percentage_change > 0 ? <ChevronUp height={18}/> : <ChevronDown height={18}/>}
                  {item.percentage_change}%{" "}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
