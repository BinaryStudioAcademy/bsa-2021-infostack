import { EntityRepository, Repository } from 'typeorm';
import { PageShareLink } from '../entities/page-share-link';

@EntityRepository(PageShareLink)
class PageShareLinkRepository extends Repository<PageShareLink> {
  public findById(id: string): Promise<PageShareLink> {
    return this.findOne({ id });
  }

  public findAllByPageAndUser(
    userId: string,
    pageId: string,
  ): Promise<PageShareLink[]> {
    return this.find({ userId, pageId });
  }
}

export default PageShareLinkRepository;
