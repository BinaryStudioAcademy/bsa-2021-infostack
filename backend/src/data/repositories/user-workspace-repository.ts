import { EntityRepository, Repository } from 'typeorm';
import { UserWorkspace } from '../entities/user-workspace';

@EntityRepository(UserWorkspace)
class UserWorkspaceRepository extends Repository<UserWorkspace> {
  public async findById(
    userId: string,
    workspaceId: string,
  ): Promise<UserWorkspace> {
    return this.findOne({
      select: ['role'],
      where: { user: userId, workspace: workspaceId },
    });
  }
}

export default UserWorkspaceRepository;
