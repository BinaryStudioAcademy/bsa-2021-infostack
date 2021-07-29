import {
  Entity,
  Column,
  OneToOne,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';
import { AbstractEntity } from '../abstract/abstract.entity';
import { User } from './user';
import { Workspace } from './workspace';
import { UserPermission } from './userPermission';
import { TeamPermission } from './teamPermission';
import { PageTag } from './pageTag';
import { PageContent } from './pageContent';
import { Comment } from './comment';

@Entity()
export class Page extends AbstractEntity {
  @RelationId((page: Page) => page.author)
  @Column()
  readonly authorId: string;

  @ManyToOne(() => User, user => user.pages)
  author: User;

  @RelationId((page: Page) => page.workspace)
  @Column()
  readonly workspaceId: string;

  @ManyToOne(() => Workspace, workspace => workspace.pages)
  workspace: Workspace;

  @RelationId((page: Page) => page.parentPage)
  @Column()
  readonly parentPageId: string;

  @ManyToOne(() => Page, page => page.childPages)
  parentPage: Page;

  @OneToMany(() => Page, page => page.parentPage)
  childPages: Page[];

  @OneToOne(() => UserPermission, UserPermission => UserPermission.page)
  userPermission: UserPermission;

  @OneToOne(() => TeamPermission, TeamPermission => TeamPermission.page)
  teamPermission: TeamPermission;

  @OneToOne(() => PageTag, PageTag => PageTag.page)
  pageTag: PageTag;

  @OneToMany(() => PageContent, PageContent => PageContent.page)
  pageContents: PageContent[];

  @OneToMany(() => Comment, Comment => Comment.page)
  comments: Comment[];
}
