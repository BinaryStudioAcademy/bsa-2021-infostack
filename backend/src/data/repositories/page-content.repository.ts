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
}
export default PageContentRepository;
