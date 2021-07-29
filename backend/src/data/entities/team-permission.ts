import {
  Entity,
  Column,
  ManyToOne,
} from 'typeorm';
import { Team } from './team';
import { Page } from './page';
import { PermissionOption } from './enums/permission-option';

@Entity()
export class TeamPermission {
  @ManyToOne(() => Team, team => team.teamPermissions, { primary: true })
  team: Team;

  @ManyToOne(() => Page, page => page.teamPermissions, { primary: true })
  page: Page;

  @Column({
    type: 'enum',
    enum: PermissionOption,
    default: PermissionOption.READ,
  })
  option: PermissionOption;
}
