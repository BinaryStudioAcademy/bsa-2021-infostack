import { Entity, PrimaryColumn, ManyToOne, RelationId, Index } from 'typeorm';
import { AbstractEntity } from '../abstract/abstract.entity';
import { NotificationType } from '../../common/enums/notification-type';
import { User } from './user';

@Entity()
@Index(['userId', 'notificationType'], { unique: true })
export class NotificationSettings extends AbstractEntity {
  @ManyToOne(() => User, (user: User) => user.notificationSettings)
  user: User;

  @RelationId(
    (notificationSettings: NotificationSettings) => notificationSettings.user,
  )
  @PrimaryColumn()
  readonly userId: string;

  @PrimaryColumn({
    type: 'enum',
    enum: NotificationType,
  })
  notificationType: NotificationType;
}
