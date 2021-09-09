import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  RelationId,
  ManyToMany,
  OneToOne,
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
import { PageShareLink } from './page-share-link';
import { Draft } from './draft';
import { RecentPage } from './recent-pages';

@Entity()
export class Page extends AbstractEntity {
  @RelationId((page: Page) => page.author)
  @Column()
  readonly authorId: string;

  @ManyToOne(() => User, (user) => user.pages)
  author: User;

  @RelationId((page: Page) => page.workspace)
  @Column()
  readonly workspaceId: string;

  @ManyToOne(() => Workspace, (workspace) => workspace.pages)
  workspace: Workspace;

  @RelationId((page: Page) => page.parentPage)
  @Column({ nullable: true })
  readonly parentPageId: string;

  @ManyToOne(() => Page, (page) => page.childPages, {
    onDelete: 'CASCADE',
  })
  parentPage: Page;

  @OneToMany(() => Page, (page) => page.parentPage)
  childPages: Page[];

  @OneToMany(() => UserPermission, (userPermission) => userPermission.page, {
    onDelete: 'CASCADE',
  })
  userPermissions: UserPermission[];

  @OneToMany(() => TeamPermission, (teamPermission) => teamPermission.page, {
    onDelete: 'CASCADE',
  })
  teamPermissions: TeamPermission[];

  @ManyToMany(() => Tag, (tag) => tag.pages, { cascade: true })
  @JoinTable({ name: 'page_tag' })
  tags: Tag[];

  @ManyToMany(() => User, (user) => user.followingPages, { cascade: true })
  @JoinTable({ name: 'user_followedPages' })
  followingUsers: User[];

  @ManyToMany(() => User, (user) => user.pinnedPages, { cascade: true })
  @JoinTable({ name: 'user_pinnedPages' })
  pinnedUsers: User[];

  @OneToMany(() => PageContent, (PageContent) => PageContent.page, {
    onDelete: 'CASCADE',
  })
  pageContents: PageContent[];

  @OneToMany(() => Comment, (Comment) => Comment.page)
  comments: Comment[];

  @OneToMany(() => PageShareLink, (ShareLink) => ShareLink.page)
  links: PageShareLink[];

  @OneToOne(() => Draft, (Draft) => Draft.page)
  draft: Draft;

  @OneToMany(() => RecentPage, (recentPage) => recentPage.page, {
    onDelete: 'CASCADE',
  })
  recentPages: RecentPage[];
}
