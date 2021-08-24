import { EntityRepository, In, Repository } from 'typeorm';
import { Tag } from '../entities/tag';

@EntityRepository(Tag)
class TagRepository extends Repository<Tag> {
  public findById(id: string): Promise<Tag> {
    return this.findOne({ id });
  }

  public findAllByWorkspaceId(workspaceId: string): Promise<Tag[]> {
    return this.createQueryBuilder('tag')
      .select('tag.id')
      .addSelect('tag.name')
      .addSelect('tag.type')
      .where('tag.workspaceId= :workspaceId', { workspaceId })
      .orderBy('tag.name', 'ASC')
      .getMany();
  }

  public getTagsByIds(ids: string[]): Promise<Tag[]> {
    return this.find({ where: { id: In(ids) } });
  }
}

export default TagRepository;
