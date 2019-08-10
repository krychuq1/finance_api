export interface IMetal {
  oz: number;
  price: number;
  type: string;
  roundTotal(fixTo: number);
}
