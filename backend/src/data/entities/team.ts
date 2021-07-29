import {
  Entity,
  Column,
  ManyToOne,
  OneToOne,
  RelationId,
} from 'typeorm';
import { AbstractEntity } from '../abstract/abstract.entity';
import { Workspace } from './workspace';
import { TeamMember } from './teamMember';
import { TeamPermission } from './teamPermission';

@Entity()
export class Team extends AbstractEntity {
  @RelationId((team: Team) => team.workspace)
  @Column()
  readonly workspaceId: string;

  @ManyToOne(() => Workspace, workspace => workspace.teams)
  workspace: Workspace;

  @OneToOne(() => TeamMember, TeamMember => TeamMember.team)
  teamMember: TeamMember;

  @OneToOne(() => TeamPermission, TeamPermission => TeamPermission.team)
  teamPermission: TeamPermission;

  @Column({ length: 50 })
  name: string;
}
