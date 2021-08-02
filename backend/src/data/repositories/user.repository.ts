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
}

export default UserRepository;
