"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";

interface FearGreedData {
  value: string;
  value_classification: string;
  timestamp: string;
}

const chartData = [{greed: 50, fear: 50 }];

const chartConfig = {
  Greed: {
    label: "Greed",
    color: "hsl(var(--up))",
  },
  Fear: {
    label: "Fear",
    color: "hsl(var(--down))",
  },
} satisfies ChartConfig;

export default function FearAndGreedIndex() {
  const [data, setData] = useState<FearGreedData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.alternative.me/fng/");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result.data[0]);
      } catch (err) {
        setError("Failed to fetch Fear and Greed Index");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Skeleton className="h-full w-full" />
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-md rounded-3xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!data) return null;

  if (parseInt(data.value) /*78*/ >= 50) {
    chartData[0].greed = parseInt(data.value);
    chartData[0].fear = 100 - chartData[0].greed;
  } else if (parseInt(data.value) /*22*/ < 50) {
    chartData[0].fear = parseInt(data.value);
    chartData[0].greed = 100 - chartData[0].fear;
  }

  return (
    <Card className="flex flex-col rounded-3xl h-[250px] pb-0 mb-0 ">
      <CardHeader className="items-center mb-0 pb-0">
        <CardTitle className="font-medium">Fear And Greed Index</CardTitle>
        <CardDescription className="font-bold text-primary text-2xl">{data.value_classification}</CardDescription>
      </CardHeader>
      <CardContent className="flex  items-center h-[100%] mt-3 pb-0 mb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto mb-0 pb-0 aspect-square w-full h-full"
          >
            <RadialBarChart
              data={chartData}
              endAngle={180}
              innerRadius={80}
              outerRadius={130}
              className="pb-0 mb-0"
            >
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}> 
                <Label className="pb-0 mb-0"
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) - 16}
                            className="fill-foreground text-2xl font-bold"
                          >
                            {parseInt(data.value).toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 4}
                            className="fill-muted-foreground"
                          >
                            {data.value_classification}
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </PolarRadiusAxis>
              <RadialBar
                dataKey="fear"
                fill="var(--color-Fear)"
                stackId="a"
                cornerRadius={1}
                className="stroke-transparent stroke-2 pb-0 mb-0"
              />
              <RadialBar
                dataKey="greed"
                stackId="a"
                cornerRadius={1}
                fill="var(--color-Greed)"
                className="stroke-transparent stroke-2 pb-0 mb-0"
              />
            </RadialBarChart>
          </ChartContainer>
      </CardContent>
    </Card>
  );
}
