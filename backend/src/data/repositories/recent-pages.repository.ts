import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { RecentPage } from '../entities/recent-pages';

@EntityRepository(RecentPage)
class RecentPagesRepository extends Repository<RecentPage> {
  public findAllByUserId(
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

  public deleteOne(userId: string, pageId: string): Promise<DeleteResult> {
    return this.createQueryBuilder()
      .delete()
      .where('userId = :userId', { userId })
      .andWhere('pageId = :pageId', { pageId })
      .execute();
  }
}

export default RecentPagesRepository;
