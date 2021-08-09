import { Entity, Column, RelationId, ManyToOne, ManyToMany } from 'typeorm';
import { AbstractEntity } from '../abstract/abstract.entity';
import { Page } from './page';
import { Workspace } from './workspace';

@Entity()
export class Tag extends AbstractEntity {
  @RelationId((tag: Tag) => tag.workspace)
  @Column({ update: false })
  workspaceId: string;

  @ManyToOne(() => Workspace, (workspace) => workspace.tags)
  workspace: Workspace;

  @Column()
  name: string;

  @ManyToMany(() => Page, (page) => page.tags)
  pages: Page[];
}
