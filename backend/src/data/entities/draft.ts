import {
  Entity,
  Column,
  OneToOne,
  RelationId,
  Unique,
  JoinColumn,
} from 'typeorm';
import { AbstractEntity } from '../abstract/abstract.entity';
import { Page } from './page';

@Entity()
@Unique(['pageId'])
export class Draft extends AbstractEntity {
  @Column()
  title: string;

  @Column()
  content: string;

  @RelationId((draft: Draft) => draft.page)
  @Column()
  pageId: string;

  @OneToOne(() => Page, (page) => page.draft, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  page: Page;
}
