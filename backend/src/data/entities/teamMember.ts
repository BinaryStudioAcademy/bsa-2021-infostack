import {
  PrimaryColumn,
  Entity,
  OneToOne,
  RelationId,
} from 'typeorm';
import { AbstractEntity } from '../abstract/abstract.entity';
import { User } from './user';
import { Team } from './team';

@Entity()
export class TeamMember extends AbstractEntity {
  @RelationId((teamMember: TeamMember) => teamMember.user)
  @PrimaryColumn()
  readonly userId: string;

  @OneToOne(() => User, user => user.teamMember)
  user: User;

  @RelationId((teamMember: TeamMember) => teamMember.team)
  @PrimaryColumn()
  readonly teamId: string;

  @OneToOne(() => Team, team => team.teamMember)
  team: Team;
}
