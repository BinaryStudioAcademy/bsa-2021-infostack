import { EntityRepository, Repository } from 'typeorm';
import { PageContent } from '../entities/page-content';
import { User } from '../entities/user';

@EntityRepository(PageContent)
class PageContentRepository extends Repository<PageContent> {
  public findById(id: string): Promise<PageContent> {
    return this.findOne({ id });
  }

  public findByPageId(pageId: string): Promise<PageContent[]> {
    return this.find({
      where: { pageId },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  public findByIdAndPageId(id: string, pageId: string): Promise<PageContent> {
    return this.findOne({
      where: { pageId, id },
    });
  }

  public getEditors(id: string): Promise<User[]> {
    return this.createQueryBuilder()
      .relation(PageContent, 'editors')
      .of(id)
      .loadMany();
  }

  public addEditor(pageContentId: string, userId: string): Promise<void> {
    return this.createQueryBuilder()
      .relation('editors')
      .of(pageContentId)
      .add(userId);
  }

  public deleteEditor(pageContentId: string, userId: string): Promise<void> {
    return this.createQueryBuilder()
      .relation('editors')
      .of(pageContentId)
      .remove(userId);
  }

  public getByUserId(userId: string): Promise<PageContent> {
    // const user = this.createQueryBuilder('pageContent')
    // .leftJoinAndSelect('page.followingUsers', 'followingUsers')
    // .where('page.id = :id', { id: id })
    // .andWhere('page.id =  :id', { id: id })
    // .getOne();

    const user = this.createQueryBuilder('pageContent')
      .leftJoinAndSelect('pageContent.editors', 'editors')
      .where('editors.userId = :id', { id: userId })
      .getOne();

    // const user = this.createQueryBuilder('pageContent')
    // .leftJoin("editors", 'editors."userId" = :userId', userId)
    // .getSql();

    const page = this.createQueryBuilder('pageContent')
      .leftJoin('editors', 'editors."userId" = :userId', userId)
      .getOne();

    console.info(user);

    return page;
  }
}
export default PageContentRepository;
