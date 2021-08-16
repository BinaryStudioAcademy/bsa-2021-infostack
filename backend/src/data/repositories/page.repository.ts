import { EntityRepository, Repository } from 'typeorm';
import { Page } from '../entities/page';
import { PageContent } from '../entities/page-content';

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

  public findPagesWithLastContent(workspaceId: string): Promise<Page[]> {
    return this.createQueryBuilder('page')
      .leftJoin(
        (qb) =>
          qb
            .from(PageContent, 'content')
            .select('MAX("content"."createdAt")', 'created_at')
            .addSelect('"content"."pageId"', 'page_id')
            .groupBy('"page_id"'),
        'last_version',
        '"last_version"."page_id" = page.id',
      )
      .leftJoinAndSelect(
        'page.pageContents',
        'pageContents',
        '"pageContents"."createdAt" = "last_version"."created_at"',
      )
      .where('page.workspaceId = :workspaceId', { workspaceId: workspaceId })
      .orderBy('page.createdAt', 'DESC')
      .getMany();
  }

  public findByIdWithContents(id: string): Promise<Page> {
    return this.findOne(
      { id },
      {
        relations: ['pageContents', 'followingUsers'],
      },
    );
  }

  public findByIdWithLastContent(id: string): Promise<Page> {
    return this.createQueryBuilder('page')
      .leftJoin(
        (qb) =>
          qb
            .from(PageContent, 'content')
            .select('MAX("content"."createdAt")', 'created_at')
            .addSelect('"content"."pageId"', 'page_id')
            .groupBy('"page_id"'),
        'last_version',
        '"last_version"."page_id" = page.id',
      )
      .leftJoinAndSelect(
        'page.pageContents',
        'pageContents',
        '"pageContents"."createdAt" = "last_version"."created_at"',
      )
      .leftJoinAndSelect('page.followingUsers', 'followingUsers')
      .where('page.id = :id', { id: id })
      .andWhere('page.id =  :id', { id: id })
      .getOne();
  }

  public findByIdWithAuthorAndContent(id: string): Promise<Page> {
    return this.findOne(id, {
      relations: ['author', 'pageContents', 'pageContents.author'],
    });
  }

  public findByIdWithTags(id: string): Promise<Page> {
    return this.findOne(id, {
      relations: ['tags'],
    });
  }

  public followPage(userId: string, pageId: string): Promise<void> {
    return this.createQueryBuilder()
      .relation('followingUsers')
      .of(pageId)
      .add(userId);
  }

  public followPages(userId: string, pageIds: string[]): Promise<void> {
    return this.createQueryBuilder()
      .relation('followingUsers')
      .of(pageIds)
      .add(userId);
  }

  public unfollowPage(userId: string, pageId: string): Promise<void> {
    return this.createQueryBuilder()
      .relation('followingUsers')
      .of(pageId)
      .remove(userId);
  }

  public unfollowPages(userId: string, pageIds: string[]): Promise<void> {
    return this.createQueryBuilder()
      .relation('followingUsers')
      .of(pageIds)
      .remove(userId);
  }
}

export default PageRepository;
