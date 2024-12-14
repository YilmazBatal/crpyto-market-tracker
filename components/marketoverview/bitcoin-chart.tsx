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
    <Card className="rounded-3xl">
      <CardContent className="p-6">
        <div className="flex grid grid-cols-1 sm:grid-cols-12 justify-between items-center">
            <div className="col-span-3 lg:col-span-4">
                <div className="font-medium mb-3">Bitcoin Chart (7d)</div>
                <div className="text-4xl font-bold">{formatMarketCap(currentMarketCap)}</div>
                <div className={`font-medium mt-3 flex items-center ${percentChange >= 0 ? 'text-up' : 'text-down'}`}>
                    {percentChange >= 0 ? <ChevronUp height={18}/> : <ChevronDown height={18}/>} {Math.abs(percentChange).toFixed(2)}%
                </div>
            </div>
            <div className="col-span-9 lg:col-span-8 h-[60px] mt-4 ">
                <SparklineChart data={data} />
            </div>
        </div>
        
      </CardContent>
    </Card>
  )
}

