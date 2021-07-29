import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  public async findByEmail(_: string): Promise<null | User> {
    /**
     *  TODO: when ticket with entities will be merged fix return type replace
     *  _ with email
     *  return null with return this.findOne({ email });
     * */
    return null;
  }
}

export default UserRepository;
