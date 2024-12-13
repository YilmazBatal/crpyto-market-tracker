const generateMockData = () => {
  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;
  const data = [];

  // Start with a base market cap value
  let marketCap = 1000000000000; // $1 trillion

  for (let i = 6; i >= 0; i--) {
    const date = new Date(now - i * oneDay);
    // Add some random fluctuation to the market cap
    marketCap += (Math.random() - 0.5) * 50000000000; // +/- $50 billion max change per day
    data.push({
      date: date.toISOString().split('T')[0], // Format as YYYY-MM-DD
      value: marketCap,
    });
  }

  return data;
};

const generateMockVolumeData = () => {
  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;
  const data = [];

  // Start with a base market cap value
  let marketCap = 100000000000; // $1 trillion

  for (let i = 6; i >= 0; i--) {
    const date = new Date(now - i * oneDay);
    // Add some random fluctuation to the market cap
    marketCap += (Math.random() - 0.5) * 50000000000; // +/- $50 billion max change per day
    data.push({
      date: date.toISOString().split('T')[0], // Format as YYYY-MM-DD
      value: marketCap,
    });
  }

  return data;
};

export const mockMarketCapData = generateMockData();
export const mockMarketVolumeData = generateMockVolumeData();

export const mockTrendingCoinData = [
  {
    img: "https://assets.coingecko.com/coins/images/20594/standard/vita-inu-head-wallet-icon-transparent.png?1696520000",
    name: "Vita Inu",
    price: 0.00000005341,
    percentage_change: -0.8,
  },
  {
    img: "https://assets.coingecko.com/coins/images/33929/standard/ponke.png?1703415326",
    name: "Ponke",
    price: 10.415,
    percentage_change: 60.8,
  },
  {
    img: "https://assets.coingecko.com/coins/images/13397/standard/Graph_Token.png?1696513159",
    name: "Grt",
    price: 0.2824,
    percentage_change: -3.3,
  },
]

