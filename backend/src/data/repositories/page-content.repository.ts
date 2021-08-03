import { EntityRepository, AbstractRepository } from 'typeorm';
import { PageContent } from '../entities/page-content';

@EntityRepository(PageContent)
export class PageContentRepository extends AbstractRepository<PageContent> {

  createAndSave(userId: string, title: string, content: string | null, pageId: string): Promise<PageContent> {
    const pageContent = this.repository.create({
      title: title,
      content: content,
      authorId: userId,
      pageId: pageId,
    });

    return this.manager.save(pageContent);
  }

}
