import { metal } from '../metal.service';

export interface IMetalSummary {
  type: metal;
  oz: number;
  pricePerOz: number;
  total: number;
}