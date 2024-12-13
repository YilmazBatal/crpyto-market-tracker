import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SparklineChart } from ".././sparkline/sparkline-chart"
import { ChevronDown, ChevronUp } from "lucide-react";

interface MetricCardProps {
  data: { date: string; value: number }[]
}

export function MetricCard({ data }: MetricCardProps) {
  const currentMarketCap = data[data.length - 1].value;
  const startMarketCap = data[0].value;
  const percentChange = ((currentMarketCap - startMarketCap) / startMarketCap) * 100;

  const formatMarketCap = (value: number) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(value);

  return (
    <Card className="rounded-3xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="font-medium">Market Cap (7d)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex grid grid-cols-1 sm:grid-cols-12 justify-between items-center">
            <div className="col-span-3 lg:col-span-6">
                <div className="text-4xl font-bold">{formatMarketCap(currentMarketCap)}</div>
                <div className={`font-medium mt-3 flex items-center ${percentChange >= 0 ? 'text-up' : 'text-down'}`}>
                    {percentChange >= 0 ? <ChevronUp height={18}/> : <ChevronDown height={18}/>} {Math.abs(percentChange).toFixed(2)}%
                </div>
            </div>
            <div className="col-span-9 lg:col-span-6 h-[60px] mt-4 ">
                <SparklineChart data={data} />
            </div>
        </div>
        
      </CardContent>
    </Card>
  )
}

