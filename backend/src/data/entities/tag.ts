import { Entity, Column, RelationId, ManyToOne, ManyToMany } from 'typeorm';
import { AbstractEntity } from '../abstract/abstract.entity';
import { Page } from './page';
import { Workspace } from './workspace';
import { TagType } from '../../common/enums/tag-type';

@Entity()
export class Tag extends AbstractEntity {
  @RelationId((tag: Tag) => tag.workspace)
  @Column()
  readonly workspaceId: string;

  @ManyToOne(() => Workspace, (workspace) => workspace.tags)
  workspace: Workspace;

  @Column()
  name: string;

  @ManyToMany(() => Page, (page) => page.tags)
  pages: Page[];

  @Column({
    type: 'enum',
    enum: TagType,
    default: TagType.APP,
  })
  type: TagType;
}
