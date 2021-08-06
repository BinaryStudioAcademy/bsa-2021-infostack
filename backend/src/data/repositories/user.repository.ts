import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  public findByEmail(email: string): Promise<User> {
    return this.findOne({ email });
  }

  public findById(id: string): Promise<User> {
    return this.findOne({ relations: ['followingPages'], where: { id: id } });
  }

  findUserTeams(userId: string): Promise<User> {
    return this.findOne({ relations: ['teams'], where: { id: userId } });
  }

  findUserPermissions(userId: string): Promise<User> {
    return this.findOne({ relations: ['userPermissions'], where: { id: userId } });
  }

  public updatePasswordById(id: string, password: string): Promise<User> {
    return this.save({ id, password });
  }
}

export default UserRepository;
