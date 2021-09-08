import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { RecentPage } from '../entities/recent-pages';
import { PageContent } from '../entities/page-content';
import { IPageStatistic } from '~/common/interfaces/page';

@EntityRepository(RecentPage)
class RecentPagesRepository extends Repository<RecentPage> {
  public findAllByUserIdandWorkspaceId(
    userId: string,
    workspaceId: string,
  ): Promise<RecentPage[]> {
    return this.createQueryBuilder('recent_page')
      .where({ userId })
      .leftJoinAndSelect('recent_page.page', 'page')
      .andWhere('page.workspaceId = :workspaceId', { workspaceId })
      .leftJoinAndSelect('page.pageContents', 'pageContents')
      .orderBy('recent_page.createdAt', 'DESC')
      .getMany();
  }

  public findMostViewed(
    availablePagesIds: string[],
    limit: number,
    dateFrom: string,
  ): Promise<IPageStatistic[]> {
    return this.createQueryBuilder('recent_page')
      .select('recent_page.pageId', 'pageId')
      .where('recent_page.pageId IN (:...ids)', { ids: availablePagesIds })
      .andWhere('recent_page.createdAt > :start_at', {
        start_at: dateFrom,
      })
      .addSelect('COUNT(recent_page.pageId)', 'count')
      .having('COUNT(recent_page.pageId) > 0')
      .leftJoin('recent_page.page', 'page')
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
        'page.pageContents',
        'pageContents',
        '"pageContents"."createdAt" = "last_version"."created_at"',
      )
      .addSelect('pageContents.title', 'title')
      .orderBy('count', 'DESC')
      .groupBy('recent_page.pageId')
      .addGroupBy('pageContents.title')
      .limit(limit)
      .execute();
  }

  public deleteOne(userId: string, pageId: string): Promise<DeleteResult> {
    return this.createQueryBuilder()
      .delete()
      .where('userId = :userId', { userId })
      .andWhere('pageId = :pageId', { pageId })
      .execute();
  }
}

export default RecentPagesRepository;
