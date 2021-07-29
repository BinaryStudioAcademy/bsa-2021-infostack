import {
  Entity,
  Column,
  RelationId,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { AbstractEntity } from '../abstract/abstract.entity';
import { Workspace } from './workspace';
import { PageTag } from './pageTag';

@Entity()
export class Tag extends AbstractEntity {
  @RelationId((tag: Tag) => tag.workspace)
  @Column()
  readonly workspaceId: string;

  @ManyToOne(() => Workspace, workspace => workspace.tags)
  workspace: Workspace;

  @Column()
  name: string;

  @OneToOne(() => PageTag, PageTag => PageTag.tag)
  pageTag: PageTag;
}
