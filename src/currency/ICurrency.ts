export interface ICurrency {
  base: string;
  date: string;
  rates: Currency[];
}
interface Currency {
  symbol: string;
  price: number;
}
