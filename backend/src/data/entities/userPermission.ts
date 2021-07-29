import {
  Entity,
  Column,
  PrimaryColumn,
  OneToOne,
  RelationId,
} from 'typeorm';
import { User } from './user';
import { Page } from './page';
import { PermissionOption } from './enums/permissionOption';

@Entity()
export class UserPermission {
  @RelationId((userPermission: UserPermission) => userPermission.user)
  @PrimaryColumn()
  readonly userId: string;

  @OneToOne(() => User, user => user.userPermission)
  user: User;

  @RelationId((userPermission: UserPermission) => userPermission.page)
  @PrimaryColumn()
  readonly pageId: string;

  @OneToOne(() => Page, page => page.userPermission)
  page: Page;

  @Column({
    type: 'enum',
    enum: PermissionOption,
    default: PermissionOption.READ,
  })
  option: PermissionOption;
}
