import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  RelationId,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { AbstractEntity } from '../abstract/abstract.entity';
import { User } from './user';
import { Workspace } from './workspace';
import { UserPermission } from './user-permission';
import { TeamPermission } from './team-permission';
import { PageContent } from './page-content';
import { Comment } from './comment';
import { Tag } from './tag';

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

  @OneToMany(() => UserPermission, userPermission => userPermission.page)
  userPermissions!: UserPermission[];

  @OneToMany(() => TeamPermission, teamPermission => teamPermission.page)
  teamPermissions!: TeamPermission[];

  @ManyToMany(() => Tag, tag => tag.pages)
  @JoinTable({ name: 'page_tag' })
  tags: Tag[];

  @OneToMany(() => PageContent, PageContent => PageContent.page)
  pageContents: PageContent[];

  @OneToMany(() => Comment, Comment => Comment.page)
  comments: Comment[];
}
