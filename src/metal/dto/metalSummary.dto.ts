import { IMetalSummary } from '../interfaces/IMetalSummary';

export class MetalSummaryDto  implements IMetalSummary {
  gold: { oz: number; total: number };
  silver: { oz: number; total: number };
  total: number;
  constructor() {
    this.gold = {oz: 0, total: 0};
    this.silver = {oz: 0, total: 0};
    this.total = 0;
  }

  roundTotal(fixTo: number): void {
    this.total = Number(this.total.toFixed(fixTo));
    this.gold.total = Number(this.gold.total.toFixed(fixTo));
    this.silver.total = Number(this.silver.total.toFixed(fixTo));
  }
}