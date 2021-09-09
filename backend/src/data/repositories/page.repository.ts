import { EntityRepository, Repository, DeleteResult } from 'typeorm';
import { IPageStatistic } from '~/common/interfaces/page';
import { Page } from '../entities/page';
import { PageContent } from '../entities/page-content';
import { User } from '../entities/user';

@EntityRepository(Page)
class PageRepository extends Repository<Page> {
  public findById(id: string): Promise<Page> {
    return this.findOne({
      relations: ['followingUsers', 'draft'],
      where: { id },
    });
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
    return this.createQueryBuilder('page')
      .leftJoinAndSelect('page.pageContents', 'pageContents')
      .leftJoinAndSelect('page.followingUsers', 'followingUsers')
      .leftJoinAndSelect('page.pinnedUsers', 'pinnedUsers')
      .leftJoinAndSelect('page.draft', 'draft')
      .where('page.id = :id', { id: id })
      .orderBy('pageContents.createdAt', 'DESC')
      .getOne();
  }

  public findByIdWithContentsShared(id: string): Promise<Page> {
    return this.createQueryBuilder('page')
      .leftJoinAndSelect('page.pageContents', 'pageContents')
      .where('page.id = :id', { id: id })
      .orderBy('pageContents.createdAt', 'DESC')
      .getOne();
  }
  public findWithLastContent(): Promise<Page[]> {
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
      .getMany();
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

  public findByIdWithVersionContent(
    pageId: string,
    versionId: string,
  ): Promise<Page> {
    return this.createQueryBuilder('page')
      .leftJoin(
        (qb) =>
          qb
            .from(PageContent, 'content')
            .select('"content"."createdAt"', 'created_at')
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
      .where('page.id = :id', { id: pageId })
      .andWhere('pageContents.id =  :id', { id: versionId })
      .getOne();
  }

  public findMostUpdated(
    availablePagesIds: string[],
    limit: number,
    dateFrom: string,
  ): Promise<IPageStatistic[]> {
    return this.createQueryBuilder('page')
      .select('page.id', 'pageId')
      .where('page.id IN (:...ids)', { ids: availablePagesIds })
      .loadRelationCountAndMap('page.count', 'page.pageContents', 'count')
      .addSelect('page.count', 'count')
      .leftJoin(
        'page.pageContents',
        'pageContents',
        'pageContents.createdAt > :start_at',
        { start_at: dateFrom },
      )
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
      .leftJoin(
        (qb) =>
          qb
            .from(PageContent, 'content')
            .select('content.title', 'title')
            .addSelect('content.createdAt', 'createdAt')
            .groupBy('content.title')
            .addGroupBy('content.createdAt'),
        'last_content',
        '"last_content"."createdAt" = "last_version"."created_at"',
      )
      .addSelect('last_content.title', 'title')
      .orderBy('page.count', 'DESC')
      .groupBy('page.id')
      .addGroupBy('last_content.title')
      .limit(limit)
      .execute();
  }

  public findСountOfUpdates(
    availablePagesIds: string[],
    dateFrom: string,
  ): Promise<IPageStatistic[]> {
    return this.createQueryBuilder('page')
      .where('page.id IN (:...ids)', { ids: availablePagesIds })
      .loadRelationCountAndMap('page.count', 'page.pageContents', 'count')
      .select('page.count', 'count')
      .leftJoin(
        'page.pageContents',
        'pageContents',
        'pageContents.createdAt > :start_at',
        { start_at: dateFrom },
      )
      .addSelect('pageContents.createdAt', 'date')
      .orderBy('page.count', 'DESC')
      .groupBy('pageContents.createdAt')
      .execute();
  }

  public findByIdWithTags(id: string): Promise<Page> {
    return this.findOne(id, {
      relations: ['tags'],
    });
  }

  public findByWorkspaceIdWithTagsAndFollowers(
    workspaceId: string,
  ): Promise<Page[] | []> {
    return this.find({
      relations: ['tags', 'followingUsers'],
      where: { workspaceId },
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

  public findFollowers(id: string): Promise<User[]> {
    return this.createQueryBuilder()
      .relation(Page, 'followingUsers')
      .of(id)
      .loadMany();
  }

  public deleteById(id: string): Promise<DeleteResult> {
    return this.createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .execute();
  }

  public pinPage(userId: string, pageId: string): Promise<void> {
    return this.createQueryBuilder()
      .relation('pinnedUsers')
      .of(pageId)
      .add(userId);
  }

  public unpinPage(userId: string, pageId: string): Promise<void> {
    return this.createQueryBuilder()
      .relation('pinnedUsers')
      .of(pageId)
      .remove(userId);
  }

  public unpinPages(userId: string, pageIds: string[]): Promise<void> {
    return this.createQueryBuilder()
      .relation('pinnedUsers')
      .of(pageIds)
      .remove(userId);
  }
  public getEditors(id: string): Promise<User[]> {
    return this.createQueryBuilder()
      .relation(Page, 'editors')
      .of(id)
      .loadMany();
  }

  public addEditor(pageId: string, userId: string): Promise<void> {
    return this.createQueryBuilder().relation('editors').of(pageId).add(userId);
  }

  public deleteEditor(pageId: string, userId: string): Promise<void> {
    return this.createQueryBuilder()
      .relation('editors')
      .of(pageId)
      .remove(userId);
  }
}

export default PageRepository;
