'use client'

import { Line, LineChart, ResponsiveContainer, YAxis } from "recharts"

interface ChartData {
  date: string
  value: number
}

export function SparklineChart({ data }: { data: ChartData[] }) {
  const minValue = Math.min(...data.map(item => item.value));
  const maxValue = Math.max(...data.map(item => item.value));

  // Calculate a slight padding (2%) for the top and bottom of the chart
  // const yDomainPadding = (maxValue - minValue) * 0;
  console.log(data);
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <YAxis 
          domain={[minValue, maxValue]} 
          hide 
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke= { data[0].value > data[data.length - 1].value ? "hsl(var(--down))" : "hsl(var(--up))"}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>

  )
}

