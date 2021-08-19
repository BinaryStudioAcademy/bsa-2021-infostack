import { IPagination } from '../common';

interface IGetUserActivities extends Partial<IPagination> {
  userId: string;
}

export type { IGetUserActivities };
