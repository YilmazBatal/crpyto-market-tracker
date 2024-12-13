'use client'

import { Skeleton } from "./ui/skeleton"

const mockMarketData = {
    marketCap: 3778496131222,
    totalVolume: 287859610023,
    volumeChange: -2.2,
};
  
export default function GridSystem() {
    return (
        <section>
            {/* Home Page Title */}
            <div className="my-5">
                <span className="text-4xl font-bold text-primary"> Cryptocurrency Prices by Market Cap </span>
                <p className="text-muted my-4">The global cryptocurrency market cap today is <span className="font-bold">$3.78 Trillion</span>, a <span className="text-down">2.2%</span> change in the last 24 hours. <span className="underline">Read more</span> </p>
            </div>
            {/* Home Page Card */}
            <div className="grid grid-cols1 lg:grid-cols-12 gap-5">
                <div className="lg:col-span-4 space-y-5 h-100 flex flex-col justify-center]">
                    <Skeleton className={`h-[140px] rounded-xl`} /> 
                    <Skeleton className={`h-[140px] rounded-xl`} />
                </div>
                <div className="lg:col-span-4 space-y-5 h-100 flex flex-col justify-center]">
                    <Skeleton className={`h-[100%] rounded-xl`} /> 
                </div>
                <div className="lg:col-span-4 space-y-5 h-100 flex flex-col justify-center]">
                    <Skeleton className={`h-[100%] rounded-xl`} /> 
                </div>
                <div className="lg:col-span-6 space-y-5 h-100 flex flex-col justify-center]">
                    <Skeleton className={`h-[250px] rounded-xl`} /> 
                </div>
                <div className="lg:col-span-3 space-y-5 h-100 flex flex-col justify-center]">
                    <Skeleton className={`h-[100%] rounded-xl`} /> 
                </div>
                <div className="lg:col-span-3 space-y-5 h-100 flex flex-col justify-center]">
                    <Skeleton className={`h-[100%] rounded-xl`} /> 
                </div>
            </div>
        </section>
        
        
    )
}