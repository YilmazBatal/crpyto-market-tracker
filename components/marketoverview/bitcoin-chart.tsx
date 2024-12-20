"use client"

import { Card, CardContent } from "@/components/ui/card"
import { SparklineChart } from "../sparkline/sparkline-chart"
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useEffect, useState } from "react"
import { BitcoinData, fetchBTCData } from "@/lib/api"

interface SparklineData {
  date: string
  value: number
}

export function BitcoinChart() {
  const [data, setData] = useState<BitcoinData | null>(null)

  useEffect(() => {
    async function loadData() {
      const btcData = await fetchBTCData()
      setData(btcData)
    }
    loadData()
  }, [])

  if (!data) {
    return <Card className="rounded-3xl h-[250px]"><CardContent className="p-6">Loading...</CardContent></Card>
  }

  const currentPrice = data.current_price
  const sparklineData: SparklineData[] = data.sparkline_in_7d.price.map((price: any, index: number) => ({
    date: new Date(Date.now() - (7 - index / 24) * 24 * 60 * 60 * 1000).toISOString(),
    value: price,
  }))
  const startPrice = sparklineData[0].value
  const percentChange = data.price_change_percentage_24h

  const formatPrice = (value: number) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'standard',
    maximumFractionDigits: 0
  }).format(value)

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
              <div className="text-4xl font-bold">{formatPrice(currentPrice)}</div>
              <div
                className={`font-medium mt-3 flex items-center ${
                  sparklineData[0].value <= sparklineData[sparklineData.length - 1].value ? "text-down" : "text-down"
                }`}
              >
                {percentChange >= 0 ? <ChevronUp height={18} /> : <ChevronDown height={18} />}{" "}
                {Math.abs(percentChange).toFixed(2)}%
              </div>
            </div>
            <div className="col-span-3 flex justify-end items-start">
              <img
                src={data.image}
                width={64}
                height={64}
                alt="Bitcoin logo"
                className="block"
              />
            </div>
          </div>
  
          {/* Bottom Content */}
          <div className="col-span-12 h-[60px] w-full mt-4">
            <SparklineChart data={sparklineData} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}