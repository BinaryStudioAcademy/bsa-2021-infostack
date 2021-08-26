import { EntityType } from '../../../common/enums/entity-type';

interface INotification {
  id: string;
  title: string;
  subtitle?: string;
  subtitleId?: string;
  body?: string;
  type: EntityType;
  read: boolean;
  createdAt: string;
}

export type { INotification };
