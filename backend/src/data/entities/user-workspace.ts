import { Entity, Column, ManyToOne, BaseEntity } from 'typeorm';

import { User } from './user';
import { Workspace } from './workspace';
import { RoleType, InviteStatus } from '../../common/enums';

@Entity()
export class UserWorkspace extends BaseEntity {
  @ManyToOne(() => User, (user) => user.userWorkspaces, { primary: true })
  user: User;

  @ManyToOne(() => Workspace, (workspace) => workspace.userWorkspaces, {
    primary: true,
  })
  workspace: Workspace;

  @Column({
    type: 'enum',
    enum: RoleType,
    default: RoleType.USER,
  })
  role: RoleType;

  @Column({
    type: 'enum',
    enum: InviteStatus,
    default: InviteStatus.JOINED,
  })
  status: InviteStatus;
}
