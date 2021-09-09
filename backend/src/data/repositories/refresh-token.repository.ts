import { EntityRepository, Repository } from 'typeorm';

import { RefreshToken } from '../entities';

@EntityRepository(RefreshToken)
class RefreshTokenRepository extends Repository<RefreshToken> {
  public findByToken(token: string): Promise<RefreshToken> {
    return this.findOne(
      { token },
      {
        relations: ['user'],
      },
    );
  }
}

export { RefreshTokenRepository };
