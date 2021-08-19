import { Entity, Column, ManyToOne, BaseEntity } from 'typeorm';
import { User } from './user';
import { Page } from './page';
import { PermissionType } from '../../common/enums/permission-type';

@Entity()
export class UserPermission extends BaseEntity {
  @ManyToOne(() => User, (user) => user.userPermissions, { primary: true })
  user: User;

  @ManyToOne(() => Page, (page) => page.userPermissions, {
    primary: true,
    onDelete: 'CASCADE',
  })
  page: Page;

  @Column({
    type: 'enum',
    enum: PermissionType,
    default: PermissionType.READ,
  })
  option: PermissionType;
}
