import { EntityRepository, AbstractRepository } from 'typeorm';
import { Page } from '../entities/page';

@EntityRepository(Page)
export class PageRepository extends AbstractRepository<Page> {

  createAndSave(authorId: string, workspaceId: string, parentPageId: string | null, childPages: Page[] | null): Promise<Page> {
    const page = this.repository.create({
      authorId: authorId,
      workspaceId: workspaceId,
      parentPageId: parentPageId,
      childPages: childPages,
    });

    return this.manager.save(page);
  }

  findPages(authorId: string, workspaceId: string): Promise<Page[]> {
    return this.repository.find({ where: { authorId: authorId, workspaceId: workspaceId } });
  }

  findOnePage(workspaceId: string, id: string): Promise<Page> {
    return this.repository.findOne(
      { where: { workspaceId: workspaceId, id: id }, relations: ['pageContents'] });
  }
}
