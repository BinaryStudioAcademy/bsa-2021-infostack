import { EntityRepository, Repository } from 'typeorm';
import { Page } from '../entities/page';

@EntityRepository(Page)
class PageRepository extends Repository<Page> {
  public findById(id: string): Promise<Page> {
    return this.findOne({ id });
  }

  public findPages(workspaceId: string): Promise<Page[]> {
    return this.find({
      relations: ['pageContents'],
      where: { workspaceId },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  public findOnePage(workspaceId: string, id: string): Promise<Page> {
    return this.findOne({
      where: { workspaceId: workspaceId, id: id },
      relations: ['pageContents'],
    });
  }
}

export default PageRepository;
