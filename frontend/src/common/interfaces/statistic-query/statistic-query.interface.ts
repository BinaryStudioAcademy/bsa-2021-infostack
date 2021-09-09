import { IPagination } from 'infostack-shared';

export interface IStatisticQuery extends IPagination {
  dateFrom?: string;
}
