import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  public async findByEmail(email: string): Promise<User> {
    return this.findOne({ email });
  }

  findById(id: string):Promise<User> {
    return this.findOne({ id });
  }

  findUserTeams(userId: string): Promise<User> {
    return this.findOne({ relations: ['teams'], where: { id: userId } });
  }

  findUserPermissions(userId: string): Promise<User> {
    return this.findOne({ relations: ['userPermissions'], where: { id: userId } });
  }

}

export default UserRepository;
