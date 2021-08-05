import { EntityRepository, Repository } from 'typeorm';
import { IPageRequest } from '~/common/interfaces/pages';
import { Page } from '../entities/page';

@EntityRepository(Page)
class PageRepository extends Repository<Page> {

  createAndSave(authorId: string, workspaceId: string, parentPageId: string | null, childPages: Page[] | null, pageContents: IPageRequest[]): Promise<Page> {
    const page = this.create({
      authorId: authorId,
      workspaceId: workspaceId,
      parentPageId: parentPageId,
      childPages: childPages,
      pageContents: pageContents,
    });

    return this.save(page);
  }

  findPages(workspaceId: string): Promise<Page[]> {
    return this.find({
      relations: ['pageContents'],
      where: { workspaceId: workspaceId },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  findOnePage(workspaceId: string, id: string): Promise<Page> {
    return this.findOne(
      { where: { workspaceId: workspaceId, id: id }, relations: ['pageContents'] });
  }
}

export default PageRepository;
