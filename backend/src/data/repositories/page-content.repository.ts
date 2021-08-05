import { EntityRepository, Repository } from 'typeorm';
import { PageContent } from '../entities/page-content';

@EntityRepository(PageContent)
export class PageContentRepository extends Repository<PageContent> {

  createAndSave(userId: string, title: string, content: string | null, pageId: string): Promise<PageContent> {
    const pageContent = this.create({
      title: title,
      content: content,
      authorId: userId,
      pageId: pageId,
    });

    return this.save(pageContent);
  }

}
