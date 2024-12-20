// app/coins/[coinID]/page.tsx
import { fetchCryptoDetail } from "@/lib/api"; // Adjust the import path as per your folder structure
import React from "react";

interface CoinDetailPageProps {
  params: {
    coinID: string;
  };
}

const CoinDetailPage: React.FC<CoinDetailPageProps> = async ({ params }) => {
  const { coinID } = params;
  const cryptoDetail = await fetchCryptoDetail(coinID);

  if (!cryptoDetail) {
    return <div>Error: Unable to fetch data for {coinID}</div>;
  }

  return (
    <div>
      <h1>{cryptoDetail.name}</h1>
      <p>{cryptoDetail.description.en}</p>
    </div>
  );
};

export default CoinDetailPage;
