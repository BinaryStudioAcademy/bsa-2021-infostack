import {
  Entity,
  Column,
  ManyToOne,
} from 'typeorm';
import { User } from './user';
import { Workspace } from './workspace';
import { UserRole } from './enums/user-role';

@Entity()
export class UserWorkspace {
  @ManyToOne(() => User, user => user.userWorkspaces, { primary: true })
  user: User;

  @ManyToOne(() => Workspace, workspace => workspace.userWorkspaces, { primary: true })
  workspace: Workspace;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;
}
