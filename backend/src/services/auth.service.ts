import { getCustomRepository } from 'typeorm';
import {
  HttpError,
  HttpCode,
  IRegister,
  IUserWithTokens,
} from 'infostack-shared';
import { generateAccessToken } from '../common/utils/generate-access-token.util';
import UserRepository from '../data/repositories/user.repository';

export const register = async (
  body: IRegister,
): Promise<Omit<IUserWithTokens, 'refreshToken'>> => {
  const userRepository = getCustomRepository(UserRepository);
  const { fullName, email, password } = body;

  const isEmailUsed = await userRepository.findByEmail(email);
  if (!isEmailUsed) {
    throw new HttpError({
      status: HttpCode.CONFLICT,
      message: 'User with such email already exists',
    });
  }

  const user = await userRepository.save({ fullName, email, password });
  delete user.password;

  return { ...user, accessToken: generateAccessToken(user.id) };
};
