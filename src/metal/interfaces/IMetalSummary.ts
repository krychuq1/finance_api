export interface IMetalSummary {
  total: number;
  silver: {
    oz: number;
    total: number;
  };
  gold: {
    oz: number;
    total: number;
  };
  roundTotal(fixTo: number): void;
}