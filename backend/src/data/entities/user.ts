import { Entity, Column, OneToMany, ManyToMany } from 'typeorm';
import { AbstractEntity } from '../abstract/abstract.entity';
import { RefreshToken } from './refresh-token';
import { UserWorkspace } from './user-workspace';
import { Page } from './page';
import { UserPermission } from './user-permission';
import { PageContent } from './page-content';
import { Comment } from './comment';
import { Team } from './team';

@Entity()
export class User extends AbstractEntity {
  @Column({ length: 200 })
  fullName: string;

  @Column({ length: 50 })
  email: string;

  @Column({ length: 200, nullable: true })
  password: string;

  @Column({ length: 100, nullable: true })
  avatar: string;

  @OneToMany(() => RefreshToken, (RefreshToken) => RefreshToken.user)
  refreshTokens: RefreshToken[];

  @OneToMany(() => UserWorkspace, (userWorkspace) => userWorkspace.user)
  userWorkspaces!: UserWorkspace[];

  @ManyToMany(() => Team, (team) => team.users)
  teams: Team[];

  @OneToMany(() => Page, (Page) => Page.author)
  pages: Page[];

  @OneToMany(() => UserPermission, (userPermission) => userPermission.user)
  userPermissions!: UserPermission[];

  @OneToMany(() => PageContent, (PageContent) => PageContent.author)
  pageContents: PageContent[];

  @OneToMany(() => Comment, (Comment) => Comment.author)
  comments: Comment[];
}
