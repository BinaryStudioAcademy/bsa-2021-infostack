import { Entity, Column, OneToMany } from 'typeorm';
import { AbstractEntity } from '../abstract/abstract.entity';
import { UserWorkspace } from './user-workspace';
import { Team } from './team';
import { Page } from './page';
import { Tag } from './tag';
import { Skill } from './skill';

@Entity()
export class Workspace extends AbstractEntity {
  @Column({ length: 50 })
  name: string;

  @OneToMany(() => UserWorkspace, (userWorkspace) => userWorkspace.workspace)
  userWorkspaces!: UserWorkspace[];

  @OneToMany(() => Team, (Team) => Team.workspace)
  teams: Team[];

  @OneToMany(() => Page, (Page) => Page.workspace)
  pages: Page[];

  @OneToMany(() => Tag, (Tag) => Tag.workspace)
  tags: Tag[];

  @OneToMany(() => Skill, (Skill) => Skill.workspace)
  skills: Skill[];
}
