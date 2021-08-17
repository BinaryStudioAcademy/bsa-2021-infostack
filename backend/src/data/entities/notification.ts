import { Entity, Column } from 'typeorm';
import { AbstractEntity } from '../abstract/abstract.entity';
import { EntityType } from '../../common/enums/entity-type';
import { MAX_NOTIFICATION_TITLE_LENGTH } from '../../common/constants/constants';

@Entity()
export class Notification extends AbstractEntity {
  @Column()
  title: string;

  @Column({
    length: MAX_NOTIFICATION_TITLE_LENGTH,
    nullable: true,
  })
  body: string;

  @Column({
    type: 'enum',
    enum: EntityType,
    default: EntityType.COMMENT,
  })
  type: string;

  @Column()
  entityTypeId: string;

  @Column()
  userId: string;

  @Column()
  read: boolean;
}
