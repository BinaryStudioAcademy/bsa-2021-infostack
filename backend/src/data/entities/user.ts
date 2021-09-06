import { Entity, Column, OneToMany, ManyToMany } from 'typeorm';
import { AbstractEntity } from '../abstract/abstract.entity';
import { RefreshToken } from './refresh-token';
import { UserWorkspace } from './user-workspace';
import { Page } from './page';
import { UserPermission } from './user-permission';
import { PageContent } from './page-content';
import { Comment } from './comment';
import { Team } from './team';
import { Skill } from './skill';
import { Reaction } from './reaction';
import { PageShareLink } from './page-share-link';
import { NotificationSettings } from './notification-settings';
import { RecentPage } from './recent-pages';

@Entity()
export class User extends AbstractEntity {
  @Column({ length: 200 })
  fullName: string;

  @Column({ length: 50 })
  email: string;

  @Column({ length: 200, nullable: true })
  password: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ length: 200, nullable: true })
  title: string;

  @OneToMany(() => RefreshToken, (RefreshToken) => RefreshToken.user)
  refreshTokens: RefreshToken[];

  @OneToMany(() => UserWorkspace, (userWorkspace) => userWorkspace.user)
  userWorkspaces!: UserWorkspace[];

  @ManyToMany(() => Team, (team) => team.users)
  teams: Team[];

  @ManyToMany(() => Skill, (skill) => skill.users)
  skills: Skill[];

  @OneToMany(() => Page, (Page) => Page.author)
  pages: Page[];

  @ManyToMany(() => Page, (page) => page.followingUsers)
  followingPages: Page[];

  @ManyToMany(() => Page, (page) => page.pinnedUsers)
  pinnedPages: Page[];

  @OneToMany(() => UserPermission, (userPermission) => userPermission.user)
  userPermissions!: UserPermission[];

  @OneToMany(() => PageContent, (PageContent) => PageContent.author)
  pageContents: PageContent[];

  @OneToMany(() => Comment, (Comment) => Comment.author)
  comments: Comment[];

  @OneToMany(() => Reaction, (reaction) => reaction.user)
  reactions: Reaction[];

  @OneToMany(() => PageShareLink, (ShareLink) => ShareLink.user)
  links: PageShareLink[];

  @OneToMany(
    () => NotificationSettings,
    (notificationSettings) => notificationSettings.user,
  )
  @OneToMany(() => RecentPage, (recentPage) => recentPage.user)
  recentPages: RecentPage[];

  notificationSettings: NotificationSettings[];
}
