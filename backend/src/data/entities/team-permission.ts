import { Entity, Column, ManyToOne, BaseEntity } from 'typeorm';
import { Team } from './team';
import { Page } from './page';
import { PermissionType } from '../../common/enums/permission-type';

@Entity()
export class TeamPermission extends BaseEntity {
  @ManyToOne(() => Team, (team) => team.teamPermissions, { primary: true })
  team: Team;

  @ManyToOne(() => Page, (page) => page.teamPermissions, { primary: true })
  page: Page;

  @Column({
    type: 'enum',
    enum: PermissionType,
    default: PermissionType.READ,
  })
  option: PermissionType;
}
