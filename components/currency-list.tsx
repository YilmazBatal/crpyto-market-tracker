"use client"

import { useState, useEffect } from 'react'
import { fetchTopCurrencies, CurrencyData } from '@/lib/currency-api'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronDown, ChevronUp } from 'lucide-react'

export function CurrencyList() {
  const [currencies, setCurrencies] = useState<CurrencyData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadCurrencies() {
      const data = await fetchTopCurrencies(100)
      setCurrencies(data)
      setIsLoading(false)
    }
    loadCurrencies()
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    }).format(price)
  }

  const formatMarketCap = (marketCap: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'standard',
      compactDisplay: 'short'
    }).format(marketCap)
  }

  if (isLoading) {
    return <Card><CardContent>Loading...</CardContent></Card>
  }

  return (
    
    <Card className="w-full rounded-3xl mt-10">
      <CardContent>
        <Table className='mt-5'>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Rank</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">24h %</TableHead>
              <TableHead className="text-right">Market Cap</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currencies.map((currency) => (
              <TableRow className='p-5 h-[60px]' key={currency.id}>
                <TableCell className="font-medium">{currency.market_cap_rank}</TableCell>
                <TableCell className="flex items-center h-[60px] " >
                  <img src={currency.image} alt={currency.name} className="w-6 h-6 mr-2" />
                  {currency.name}
                  <span className="ml-2 text-muted uppercase">{currency.symbol}</span>
                </TableCell>
                <TableCell className="text-right ">{formatPrice(currency.current_price)}</TableCell>
                <TableCell className={`text-right ${currency.price_change_percentage_24h >= 0 ? 'text-up' : 'text-down'}`}>
                  <span className="flex items-center justify-end ">
                    {currency.price_change_percentage_24h >= 0 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    {Math.abs(currency.price_change_percentage_24h).toFixed(2)}%
                  </span>
                </TableCell>
                <TableCell className="text-right">{formatMarketCap(currency.market_cap)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

