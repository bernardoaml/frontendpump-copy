interface Price {
  id: bigint;
  coinId: number;
  timestamp: string | Date;
  price: number;
  provider: string;
}

interface ProviderPrice {
  price: number;
  priceDate: Date;
  provider: string;
}
