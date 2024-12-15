import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SparklineChart } from ".././sparkline/sparkline-chart"
import { ChevronDown, ChevronUp } from "lucide-react";

interface MetricCardProps {
  // data: { date: string; value: number }[]
  data : {
    market_data : number,
    market_data_change : number, 
    name: string,
  }
}

export function MetricCard({ data }: MetricCardProps) {
  // const currentMarketCap = data[data.length - 1].value;
  // const startMarketCap = data[0].value;
  // const percentChange = ((currentMarketCap - startMarketCap) / startMarketCap) * 100;

  const formatMarketCap = (value: number) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 2
  }).format(value);

  return (
    <Card className="rounded-3xl max-h-[270px]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="font-medium">{data.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex grid grid-cols-12 sm:grid-cols-12 justify-between items-center">
            <div className="col-span-4  sm:col-span-6">
                <div className="text-3xl font-bold">{formatMarketCap(data.market_data)}</div>
                <div className={`font-medium mt-3 flex items-center ${data.market_data_change >= 0 ? 'text-up' : 'text-down'} ${data.name !== "Market Cap (7d)" ? "hidden" : ""}`}  >
                    {data.market_data_change >= 0 ? <ChevronUp height={18}/> : <ChevronDown height={18}/>} {Math.abs(data.market_data_change).toFixed(2)}%
                </div>
            </div>
            <div className="col-span-8 sm:col-span-6 w-full h-full flex justify-end items-center">
                <img
                src= {data.name != "Market Cap (7d)" ? "https://www.coingecko.com/total_volume.svg" : "https://www.coingecko.com/total_market_cap.svg"}
                width={270}
                height={108}
                alt="" />
                {/* <SparklineChart data={data} /> */}
            </div>
        </div>
        
      </CardContent>
    </Card>
  )
}

