import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface BTCCardProps {
  data: {
    img: string;
    name: string;
    price: number;
    percentage_change: number;
  }[];
}

export function BitcoinChart({ }) {
  const formatMarketCap = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value);

  return (
    <Card className="h-[250px] rounded-3xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 mb-2">
        
      </CardHeader>
      <CardContent className="px-4">
        
      </CardContent>
    </Card>
  );
}
