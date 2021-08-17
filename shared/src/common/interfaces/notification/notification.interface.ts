import { EntityType } from '~/common/enums/entity-type';

interface INotification {
  id: string;
  title: string;
  subtitle?: string;
  body?: string;
  type: EntityType;
  createdAt: string;
}

export type { INotification };
