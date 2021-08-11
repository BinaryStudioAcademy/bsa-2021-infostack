import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  public findByEmail(email: string): Promise<User> {
    return this.findOne({ email }, { relations: ['skills'] });
  }

  public findById(id: string): Promise<User> {
    return this.findOne({ id }, { relations: ['skills'] });
  }

  public findUserTeams(userId: string): Promise<User> {
    return this.findOne({ relations: ['teams'], where: { id: userId } });
  }

  public findUserPermissions(userId: string): Promise<User> {
    return this.findOne({
      relations: ['userPermissions'],
      where: { id: userId },
    });
  }

  public updatePasswordById(id: string, password: string): Promise<User> {
    return this.save({ id, password });
  }

  public updateAvatarById(id: string, avatar: string): Promise<User> {
    return this.save({ id, avatar });
  }
}

export default UserRepository;
