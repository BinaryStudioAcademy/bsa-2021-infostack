import { EntityRepository, Repository } from 'typeorm';
import { Page } from '../entities/page';

@EntityRepository(Page)
class PageRepository extends Repository<Page> {
  public findById(id: string): Promise<Page> {
    return this.findOne({ relations: ['followingUsers'], where: { id } });
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

  public findByIdWithContents(id: string): Promise<Page> {
    return this.findOne(
      { id },
      {
        relations: ['pageContents', 'followingUsers'],
      },
    );
  }

  public findByIdWithAuthorAndContent(id: string): Promise<Page> {
    return this.findOne(id, {
      relations: ['author', 'pageContents', 'pageContents.author'],
    });
  }
}

export default PageRepository;
