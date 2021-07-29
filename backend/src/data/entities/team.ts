import {
  Entity,
  Column,
  ManyToOne,
  RelationId,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { AbstractEntity } from '../abstract/abstract.entity';
import { Workspace } from './workspace';
import { TeamPermission } from './team-permission';
import { User } from './user';

@Entity()
export class Team extends AbstractEntity {
  @RelationId((team: Team) => team.workspace)
  @Column()
  readonly workspaceId: string;

  @ManyToOne(() => Workspace, workspace => workspace.teams)
  workspace: Workspace;

  @ManyToMany(() => User, user => user.teams)
  @JoinTable({ name: 'team_member' })
  users: User[];

  @OneToMany(() => TeamPermission, teamPermission => teamPermission.team)
  teamPermissions: TeamPermission[];

  @Column({ length: 50 })
  name: string;
}
