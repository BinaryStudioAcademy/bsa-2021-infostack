import { getCustomRepository } from 'typeorm';
import { HttpError } from '../common/errors/http-error';
import { HttpCode } from '../common/enums/http-code';
import { IRegister } from '../common/interfaces/auth/register.interface';
import { ILogin } from '../common/interfaces/auth/login.interface';
import { IUserWithTokens } from '../common/interfaces/user/user-auth.interface';
import { generateAccessToken } from '../common/utils/generate-access-token.util';
import UserRepository from '../data/repositories/user.repository';
import { hash, verify } from '../common/utils/hash.util';

export const register = async (
  body: IRegister,
): Promise<Omit<IUserWithTokens, 'refreshToken'>> => {
  const userRepository = getCustomRepository(UserRepository);

  const isEmailUsed = await userRepository.findByEmail(body.email);
  if (isEmailUsed) {
    throw new HttpError({
      status: HttpCode.CONFLICT,
      message: 'User with such email already exists',
    });
  }

  const hashedPassword = await hash(body.password);
  const { password, ...user } = await userRepository.save({
    ...body,
    password: hashedPassword,
  });

  return { ...user, accessToken: generateAccessToken(user.id) };
};

export const login = async (
  body: ILogin,
): Promise<Omit<IUserWithTokens, 'refreshToken'>> => {
  const userRepository = getCustomRepository(UserRepository);

  const user = await userRepository.findByEmail(body.email);
  if (!user) {
    throw new HttpError({
      status: HttpCode.NOT_FOUND,
      message: 'No user with such email',
    });
  }

  const isPasswordCorrect = await verify(body.password, user.password);
  if (!isPasswordCorrect) {
    throw new HttpError({
      status: HttpCode.BAD_REQUEST,
      message: 'Invalid password',
    });
  }

  return {
    ...user,
    accessToken: generateAccessToken(user.id),
  };
};
