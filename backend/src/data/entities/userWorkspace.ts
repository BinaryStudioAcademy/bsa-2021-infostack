import {
  Entity,
  Column,
  PrimaryColumn,
  OneToOne,
  RelationId,
} from 'typeorm';
import { User } from './user';
import { Workspace } from './workspace';
import { UserRole } from './enums/userRole';

@Entity()
export class UserWorkspace {
  @RelationId((userWorkspace: UserWorkspace) => userWorkspace.workspace)
  @PrimaryColumn()
  readonly workspaceId: string;

  @OneToOne(() => Workspace, workspace => workspace.userWorkspace)
  workspace: Workspace;

  @RelationId((userWorkspace: UserWorkspace) => userWorkspace.user)
  @PrimaryColumn()
  readonly userId: string;

  @OneToOne(() => User, user => user.userWorkspace)
  user: User;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;
}
