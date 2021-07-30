import { EntityRepository, Repository } from 'typeorm';
import { UserWorkspace } from '../entities/user-workspace';

@EntityRepository(UserWorkspace)
class UserWorkspaceRepository extends Repository<UserWorkspace> {
  public async findUserWorkspaces(userId: string): Promise<UserWorkspace[]>  {
    return await this.find({
      relations: ['workspace', 'user'],
      where: { user: { id: userId } },
    });
  }
}

export default UserWorkspaceRepository;
