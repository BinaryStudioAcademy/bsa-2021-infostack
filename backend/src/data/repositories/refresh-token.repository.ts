import { EntityRepository, Repository } from 'typeorm';
import { RefreshToken } from '../entities/refresh-token';

@EntityRepository(RefreshToken)
class refreshTokenRepository extends Repository<RefreshToken> {

}

export default refreshTokenRepository;
