import { IMetalSummary } from '../../metal/interfaces/IMetalSummary';

export interface IUserSummary {
  login: string;
  metals: IMetalSummary[];
}
