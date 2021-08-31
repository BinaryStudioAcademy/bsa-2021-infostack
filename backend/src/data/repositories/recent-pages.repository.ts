import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { RecentPage } from '../entities/recent-pages';

@EntityRepository(RecentPage)
class RecentPagesRepository extends Repository<RecentPage> {
  public findAllByUserId(userId: string): Promise<RecentPage[]> {
    return this.find({
      relations: ['page', 'page.pageContents'],
      where: { userId },
      order: {
        createdAt: 'DESC',
      },
    });
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
