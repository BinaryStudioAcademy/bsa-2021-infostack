import { IPagination } from '../pagination';

interface IGetUserActivities extends Partial<IPagination> {
  userId: string;
}

export type { IGetUserActivities };
