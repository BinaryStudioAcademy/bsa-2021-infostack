import { EntityRepository, Repository } from 'typeorm';
import { InviteStatus } from '../../common/enums/invite-status';
import { UserWorkspace } from '../entities/user-workspace';

@EntityRepository(UserWorkspace)
class UserWorkspaceRepository extends Repository<UserWorkspace> {
  public findUserWorkspaces(userId: string): Promise<UserWorkspace[]> {
    return this.createQueryBuilder('userWorkspace')
      .leftJoinAndSelect('userWorkspace.workspace', 'workspace')
      .leftJoinAndSelect('userWorkspace.user', 'user')
      .where('user.id = :userId', { userId })
      .andWhere('userWorkspace.status != :status', {
        status: InviteStatus.DECLINED,
      })
      .getMany();
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
