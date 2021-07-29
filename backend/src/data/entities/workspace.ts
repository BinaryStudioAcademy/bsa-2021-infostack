import {
  Entity,
  Column,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { AbstractEntity } from '../abstract/abstract.entity';
import { UserWorkspace } from './userWorkspace';
import { Team } from './team';
import { Page } from './page';
import { Tag } from './tag';

@Entity()
export class Workspace extends AbstractEntity {
  @Column({ length: 50 })
  name: string;

  @OneToOne(() => UserWorkspace, UserWorkspace => UserWorkspace.workspace)
  userWorkspace: UserWorkspace;

  @OneToMany(() => Team, Team => Team.workspace)
  teams: Team[];

  @OneToMany(() => Page, Page => Page.workspace)
  pages: Page[];

  @OneToMany(() => Tag, Tag => Tag.workspace)
  tags: Tag[];
}
