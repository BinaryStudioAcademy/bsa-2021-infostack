import { EntityRepository, Repository } from 'typeorm';
import { UserWorkspace } from '../entities/user-workspace';

@EntityRepository(UserWorkspace)
class UserWorkspaceRepository extends Repository<UserWorkspace> {

}

export default UserWorkspaceRepository;
