import { EntityRepository, Repository } from 'typeorm';
import { Tag } from '../entities/tag';

@EntityRepository(Tag)
class TagRepository extends Repository<Tag> {
  public findById(id: string): Promise<Tag> {
    return this.findOne({ id });
  }
  public findAllByWorkspaceId(workspaceId: string): Promise<Tag[]> {
    return this.find({ workspaceId });
  }
}

export default TagRepository;
