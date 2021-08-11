import { EntityRepository, Repository } from 'typeorm';
import { PageContent } from '../entities/page-content';

@EntityRepository(PageContent)
class PageContentRepository extends Repository<PageContent> {}

export default PageContentRepository;
