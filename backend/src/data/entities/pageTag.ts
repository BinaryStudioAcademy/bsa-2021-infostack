import {
  Entity,
  PrimaryColumn,
  OneToOne,
  RelationId,
} from 'typeorm';
import { Tag } from './tag';
import { Page } from './page';

@Entity()
export class PageTag {
  @RelationId((pageTag: PageTag) => pageTag.tag)
  @PrimaryColumn()
  readonly tagId: string;

  @OneToOne(() => Tag, tag => tag.pageTag)
  tag: Tag;

  @RelationId((pageTag: PageTag) => pageTag.page)
  @PrimaryColumn()
  readonly pageId: string;

  @OneToOne(() => Page, page => page.pageTag)
  page: Page;
}
