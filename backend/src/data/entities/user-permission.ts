import {
  Entity,
  Column,
  ManyToOne,
} from 'typeorm';
import { User } from './user';
import { Page } from './page';
import { PermissionOption } from './enums/permission-option';

@Entity()
export class UserPermission {
  @ManyToOne(() => User, user => user.userPermissions, { primary: true })
  user: User;

  @ManyToOne(() => Page, page => page.userPermissions, { primary: true })
  page: Page;

  @Column({
    type: 'enum',
    enum: PermissionOption,
    default: PermissionOption.READ,
  })
  option: PermissionOption;
}
