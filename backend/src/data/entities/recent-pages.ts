import {
  Entity,
  RelationId,
  BaseEntity,
  CreateDateColumn,
  PrimaryColumn,
  ManyToOne,
} from 'typeorm';
import { Page } from './page';
import { User } from './user';

@Entity()
export class RecentPage extends BaseEntity {
  @CreateDateColumn()
  createdAt: Date;

  @RelationId((recentPage: RecentPage) => recentPage.user)
  @PrimaryColumn()
  readonly userId: string;

  @RelationId((recentPage: RecentPage) => recentPage.page)
  @PrimaryColumn()
  readonly pageId: string;

  @ManyToOne(() => User, (user) => user.recentPages, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Page, (page) => page.recentPages, {
    onDelete: 'CASCADE',
  })
  page: Page;
}
