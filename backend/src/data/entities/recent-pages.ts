import {
  Entity,
  RelationId,
  ManyToMany,
  BaseEntity,
  CreateDateColumn,
  PrimaryColumn,
} from 'typeorm';
import { Page } from './page';
import { User } from './user';

@Entity()
export class RecentPage extends BaseEntity {
  @CreateDateColumn()
  createdAt: Date;

  @RelationId((recentPage: RecentPage) => recentPage.users)
  @PrimaryColumn()
  readonly userId: string;

  @RelationId((recentPage: RecentPage) => recentPage.pages)
  @PrimaryColumn()
  readonly pageId: string;

  @ManyToMany(() => User, (user) => user.recentPages)
  users: User[];

  @ManyToMany(() => Page, (page) => page.recentUsers)
  pages: Page[];
}
