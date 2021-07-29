import {
  Entity,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { AbstractEntity } from '../abstract/abstract.entity';
import { RefreshToken } from './refreshToken';
import { UserWorkspace } from './userWorkspace';
import { TeamMember } from './teamMember';
import { Page } from './page';
import { UserPermission } from './userPermission';
import { PageContent } from './pageContent';
import { Comment } from './comment';

@Entity()
export class User extends AbstractEntity {
  @Column({ length: 200 })
  fullName: string;

  @Column({ length: 50 })
  email: string;

  @Column({ length: 100, nullable: true })
  password: string;

  @OneToMany(() => RefreshToken, RefreshToken => RefreshToken.user)
  refreshTokens: RefreshToken[];

  @OneToOne(() => UserWorkspace, UserWorkspace => UserWorkspace.user)
  userWorkspace: UserWorkspace;

  @OneToOne(() => TeamMember, TeamMember => TeamMember.user)
  teamMember: TeamMember;

  @OneToMany(() => Page, Page => Page.author)
  pages: Page[];

  @OneToOne(() => UserPermission, UserPermission => UserPermission.user)
  userPermission: UserPermission;

  @OneToMany(() => PageContent, PageContent => PageContent.author)
  pageContents: PageContent[];

  @OneToMany(() => Comment, Comment => Comment.author)
  comments: Comment[];
}
