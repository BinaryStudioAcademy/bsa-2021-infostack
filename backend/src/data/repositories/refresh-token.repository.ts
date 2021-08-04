import { EntityRepository, Repository } from 'typeorm';
import { RefreshToken } from '../entities/refresh-token';

@EntityRepository(RefreshToken)
class refreshTokenRepository extends Repository<RefreshToken> {
  public findByToken(token: string): Promise<RefreshToken> {
    return this.findOne(
      { token },
      {
        relations: [
          'user',
        ],
      },
    );
  }
}

export default refreshTokenRepository;
