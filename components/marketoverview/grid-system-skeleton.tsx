'use client'

import React from "react";
import { Skeleton } from "./ui/skeleton";

export default function GridSystemSkeleton() {
  return (
    <section>
        <div className="my-5">
          <div>
            <Skeleton className="w-[600px] h-[40px] mb-5"/>
            <Skeleton className="w-[900px] h-[20px] mb-3"/>
            <Skeleton className="w-[300px] h-[20px] mb-5"/>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-4 space-y-5 h-full flex flex-col justify-center">
              <Skeleton className="h-[140px] rounded-xl" />
              <Skeleton className="h-[140px] rounded-xl" />
            </div>
            <div className="lg:col-span-4 space-y-5 h-full flex flex-col justify-center">
              <Skeleton className="h-full rounded-xl" />
            </div>
            <div className="lg:col-span-4 space-y-5 h-full flex flex-col justify-center">
              <Skeleton className="h-full rounded-xl" />
            </div>
            <div className="lg:col-span-6 space-y-5 h-full flex flex-col justify-center">
              <Skeleton className="h-[250px] rounded-xl" />
            </div>
            <div className="lg:col-span-3 space-y-5 h-full flex flex-col justify-center">
              <Skeleton className="h-full rounded-xl" />
            </div>
            <div className="lg:col-span-3 space-y-5 h-full flex flex-col justify-center">
              <Skeleton className="h-full rounded-xl" />
            </div>
          </div>
        </div>
    </section>
  );
}

