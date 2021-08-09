import { EntityRepository, Repository } from 'typeorm';
import { PageContent } from '../entities/page-content';

@EntityRepository(PageContent)
export class PageContentRepository extends Repository<PageContent> {
  public findByPageId(id: string): Promise<PageContent> {
    return this.findOne({ pageId: id });
  }
}
