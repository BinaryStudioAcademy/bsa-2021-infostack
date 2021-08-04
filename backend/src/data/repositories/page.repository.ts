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

  findPages(workspaceId: string): Promise<Page[]> {
    return this.repository.find({
      relations: ['pageContents'],
      where: { workspaceId: workspaceId },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  findOnePage(workspaceId: string, id: string): Promise<Page> {
    return this.repository.findOne(
      { where: { workspaceId: workspaceId, id: id }, relations: ['pageContents'] });
  }
}
