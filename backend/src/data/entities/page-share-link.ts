import { Entity, Column, ManyToOne, RelationId } from 'typeorm';
import { AbstractEntity } from '../abstract/abstract.entity';
import { Page } from './page';
import { User } from './user';

@Entity()
export class PageShareLink extends AbstractEntity {
  @RelationId((link: PageShareLink) => link.page)
  @Column()
  readonly pageId: string;

  @ManyToOne(() => Page, (page) => page.links)
  page: Page;

  @RelationId((link: PageShareLink) => link.user)
  @Column()
  readonly userId: string;

  @ManyToOne(() => User, (user) => user.links)
  user: User;

  @Column('timestamp without time zone')
  expireAt: Date;

  @Column({ nullable: true })
  name: string;
}
