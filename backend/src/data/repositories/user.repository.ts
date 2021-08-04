import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  public findByEmail(email: string): Promise<User> {
    return this.findOne({ email });
  }

  public findById(id: string): Promise<User> {
    return this.findOne({ id });
  }

  public updatePasswordById(id: string, password: string): Promise<User> {
    return this.save({ id, password });
  }
}

export default UserRepository;
