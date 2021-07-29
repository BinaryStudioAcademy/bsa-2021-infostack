import { getCustomRepository } from 'typeorm';
import {
  HttpError,
  HttpCode,
  IRegister,
  IUserWithTokens,
  ILogin,
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

export const login = async (
  body: ILogin,
): Promise<Omit<IUserWithTokens, 'refreshToken'>> => {
  const userRepository = getCustomRepository(UserRepository);
  const { email } = body;

  /**
   * TODO: when ticket with entities will be merged replace
   * const [user] = await userRepository.find();
   * with
   * const user = await userRepository.findByEmail(email);
   */
  const [user] = await userRepository.find();
  if (!user) {
    throw new HttpError({
      status: HttpCode.NOT_FOUND,
      message: 'No user with such email',
    });
  }

  // TODO: when ticket with entities will be merged uncomment code below
  // if (user.password !== password) {
  //   throw new HttpError({
  //     status: HttpCode.BAD_REQUEST,
  //     message: 'Invalid password',
  //   });
  // }

  return { ...user, email, accessToken: generateAccessToken(user.id) };
};
