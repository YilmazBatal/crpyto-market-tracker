import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SparklineChart } from ".././sparkline/sparkline-chart"
import { ChevronDown, ChevronUp } from "lucide-react";

interface MetricCardProps {
  data: { date: string; value: number }[]
}

export function BitcoinChart({ data }: MetricCardProps) {
  const currentMarketCap = data[data.length - 1].value;
  const startMarketCap = data[0].value;
  const percentChange = ((currentMarketCap - startMarketCap) / startMarketCap) * 100;

  const formatMarketCap = (value: number) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'standard',
    maximumFractionDigits: 0
  }).format(value);

  return (
    <Card className="rounded-3xl h-[250px]">
      <CardContent className="p-6">
        <div className="grid grid-cols-12 h-[100%] gap-4">
          {/* Top Content */}
          <div className="col-span-12 grid grid-cols-12">
            <div className="col-span-9">
              <div className="font-medium mb-3">
                Bitcoin Chart (7d)
              </div>
              <div className="text-4xl font-bold">{formatMarketCap(currentMarketCap)}</div>
              <div
                className={`font-medium mt-3 flex items-center ${
                  percentChange >= 0 ? "text-up" : "text-down"
                }`}
              >
                {percentChange >= 0 ? <ChevronUp height={18} /> : <ChevronDown height={18} />}{" "}
                {Math.abs(percentChange).toFixed(2)}%
              </div>
            </div>
            <div className="col-span-3 flex justify-end items-start">
              <img
                src="https://assets.coingecko.com/coins/images/1/standard/bitcoin.png?1696501400"
                width={64}
                alt=""
                className="block"
              />
            </div>
          </div>
  
          {/* Bottom Content */}
          <div className="col-span-12 h-[60px] w-full mt-4">
            <SparklineChart data={data} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

