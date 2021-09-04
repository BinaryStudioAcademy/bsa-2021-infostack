import { Entity, Column, ManyToOne, RelationId } from 'typeorm';
import { AbstractEntity } from '../abstract/abstract.entity';
import { Page } from './page';
import { User } from './user';

@Entity()
export class PageContent extends AbstractEntity {
  @RelationId((pageContent: PageContent) => pageContent.page)
  @Column()
  readonly pageId: string;

  @ManyToOne(() => Page, (page) => page.pageContents, {
    onDelete: 'CASCADE',
  })
  page: Page;

  @Column({ length: 50 })
  title: string;

  @Column()
  content: string;

  @RelationId((pageContent: PageContent) => pageContent.author)
  @Column()
  readonly authorId: string;

  @ManyToOne(() => User, (user) => user.pageContents)
  author: User;
}
