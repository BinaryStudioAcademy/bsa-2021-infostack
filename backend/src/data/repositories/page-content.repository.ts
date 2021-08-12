import { EntityRepository, Repository } from 'typeorm';
import { PageContent } from '../entities/page-content';

@EntityRepository(PageContent)
class PageContentRepository extends Repository<PageContent> {
  public findById(id: string): Promise<PageContent> {
    return this.findOne({ id });
  }

  public findByPageId(pageId: string): Promise<PageContent[]> {
    return this.find({
      where: { pageId },
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
export default PageContentRepository;
