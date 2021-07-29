import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  public async findByEmail(_: string): Promise<null> {
    /**
     *  TODO: when ticket with entities will be merged replace
     *  _ with email
     *  return null with return this.findOne({ email });
     * */
    return null;
  }
}

export default UserRepository;
