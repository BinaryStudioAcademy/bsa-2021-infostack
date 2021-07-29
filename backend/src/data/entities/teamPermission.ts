import {
  Entity,
  Column,
  PrimaryColumn,
  OneToOne,
  RelationId,
} from 'typeorm';
import { Team } from './team';
import { Page } from './page';
import { PermissionOption } from './enums/permissionOption';

@Entity()
export class TeamPermission {
  @RelationId((teamPermission: TeamPermission) => teamPermission.team)
  @PrimaryColumn()
  readonly teamId: string;

  @OneToOne(() => Team, team => team.teamPermission)
  team: Team;

  @RelationId((teamPermission: TeamPermission) => teamPermission.page)
  @PrimaryColumn()
  readonly pageId: string;

  @OneToOne(() => Page, page => page.teamPermission)
  page: Page;

  @Column({
    type: 'enum',
    enum: PermissionOption,
    default: PermissionOption.READ,
  })
  option: PermissionOption;
}
