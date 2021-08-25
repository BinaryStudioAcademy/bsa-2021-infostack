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

  @ManyToOne(() => Workspace, (workspace) => workspace.teams)
  workspace: Workspace;

  @ManyToMany(() => User, (user) => user.teams, { cascade: true })
  @JoinTable({
    name: 'team_member',
    joinColumn: { name: 'teamId', referencedColumnName: 'id' },
  })
  users: User[];

  @OneToMany(() => TeamPermission, (teamPermission) => teamPermission.team)
  teamPermissions: TeamPermission[];

  @Column({ length: 50 })
  name: string;

  @Column({ default: 'c5fa3b2f-c4de-4dda-84e7-714ee852627e' })
  owner: string;
}
