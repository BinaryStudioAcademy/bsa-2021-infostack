import { EntityRepository, AbstractRepository } from 'typeorm';
import { Page } from '../entities/page';
import { PageContent } from '../entities/page-content';

@EntityRepository(Page)
export class PageRepository extends AbstractRepository<Page> {

  createAndSave(authorId: string, workspaceId: string, parentPageId: string | null, childPages: Page[] | null, pageContents: PageContent[]): Promise<Page> {
    const page = this.repository.create({
      authorId: authorId,
      workspaceId: workspaceId,
      parentPageId: parentPageId,
      childPages: childPages,
      pageContents: pageContents,
    });

    return this.manager.save(page);
  }

  findPages(authorId: string, workspaceId: string): Promise<Page[]> {
    return this.repository.find({ where: { authorId: authorId, workspaceId: workspaceId } });
  }

  findOnePage(authorId: string, workspaceId: string, pageId: string): Promise<Page> {
    return this.repository.findOne({ where: { authorId: authorId, workspaceId: workspaceId, id: pageId } });
  }
}
