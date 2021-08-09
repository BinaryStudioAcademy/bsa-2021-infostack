import { EntityRepository, Repository } from 'typeorm';
import { UserWorkspace } from '../entities/user-workspace';

@EntityRepository(UserWorkspace)
class UserWorkspaceRepository extends Repository<UserWorkspace> {
  public findUserWorkspaces(userId: string): Promise<UserWorkspace[]> {
    return this.find({
      relations: ['workspace', 'user'],
      where: { user: { id: userId } },
    });
  }

  public findByUserIdAndWorkspaceId(
    userId: string,
    workspaceId: string,
  ): Promise<UserWorkspace> {
    return this.findOne({
      select: ['role'],
      where: { user: userId, workspace: workspaceId },
    });
  }

  public findByUserIdAndWorkspaceIdDetailed(
    userId: string,
    workspaceId: string,
  ): Promise<UserWorkspace> {
    return this.findOne({
      relations: ['workspace', 'user'],
      where: { user: userId, workspace: workspaceId },
    });
  }
}

export default UserWorkspaceRepository;
