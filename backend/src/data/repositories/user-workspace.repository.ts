import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { InviteStatus } from '../../common/enums/invite-status';
import { RoleType } from '../../common/enums/role-type';
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

  public findWorkspaceAdmins(workspaceId: string): Promise<UserWorkspace[]> {
    return this.createQueryBuilder('userWorkspace')
      .leftJoin('userWorkspace.workspace', 'workspace')
      .leftJoinAndSelect('userWorkspace.user', 'user')
      .where('workspace.id = :workspaceId', { workspaceId })
      .andWhere('userWorkspace.role = :role', {
        role: RoleType.ADMIN,
      })
      .getMany();
  }

  public deleteByUserIdAndWorkspaceId(
    userId: string,
    workspaceId: string,
  ): Promise<DeleteResult> {
    return this.delete({
      user: { id: userId },
      workspace: { id: workspaceId },
    });
  }

  public updateRoleByUserIdAndWorkspaceId(
    userId: string,
    workspaceId: string,
    role: RoleType,
  ): Promise<UserWorkspace> {
    return this.save({
      user: { id: userId },
      workspace: { id: workspaceId },
      role,
    });
  }
}

export default UserWorkspaceRepository;
