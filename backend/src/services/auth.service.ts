import jwt from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import { google } from 'googleapis';

import { HttpError } from '../common/errors';
import { HttpCode, HttpErrorMessage } from '../common/enums';
import {
  IUserWithTokens,
  IUser,
  IResetPassword,
  IRegister,
  IRefreshToken,
  ITokens,
  ILogin,
  ISetPassword,
  IUpdatePasswordAndFullName,
} from '../common/interfaces';
import {
  generateTokens,
  generateAccessToken,
  hash,
  verify,
  sendMail,
  getAccessToken,
  getUser,
} from '../common/utils';
import { mapPageToIPage, mapLinkToILink } from '../common/mappers';
import { UserRepository, RefreshTokenRepository } from '../data/repositories';
import { User } from '~/data/entities';
import { env } from '../env';

const setTokens = async (user: IUser): Promise<ITokens> => {
  const tokens = generateTokens(user.id);
  const refreshTokenRepository = getCustomRepository(RefreshTokenRepository);
  const refreshToken = refreshTokenRepository.create({
    user,
    token: tokens.refreshToken,
  });
  await refreshTokenRepository.save(refreshToken);

  return tokens;
};

export const register = async (
  payload: IRegister,
): Promise<Omit<IUserWithTokens, 'refreshToken'>> => {
  const userRepository = getCustomRepository(UserRepository);
  const existingUser = await userRepository.findByEmail(
    payload.email.toLowerCase(),
  );

  if (existingUser && existingUser.password !== null) {
    throw new HttpError({
      status: HttpCode.CONFLICT,
      message: HttpErrorMessage.EMAIL_ALREADY_EXISTS,
    });
  }

  const hashedPassword = await hash(payload.password);
  const userData = {
    ...payload,
    email: payload.email.toLowerCase(),
    password: hashedPassword,
  };

  const user =
    existingUser?.password === null
      ? await userRepository.save({
          ...existingUser,
          ...userData,
        })
      : await userRepository.save(userData);

  return getIUserWithTokens(user);
};

export const login = async (
  payload: ILogin,
): Promise<Omit<IUserWithTokens, 'refreshToken'>> => {
  const userRepository = getCustomRepository(UserRepository);

  const user = await userRepository.findByEmail(payload.email.toLowerCase());
  if (!user || user.password === null) {
    throw new HttpError({
      status: HttpCode.BAD_REQUEST,
      message: HttpErrorMessage.INVALID_LOGIN_DATA,
    });
  }

  const isPasswordCorrect = await verify(payload.password, user.password);
  if (!isPasswordCorrect) {
    throw new HttpError({
      status: HttpCode.BAD_REQUEST,
      message: HttpErrorMessage.INVALID_LOGIN_DATA,
    });
  }

  return getIUserWithTokens(user);
};

export const resetPassword = async (payload: IResetPassword): Promise<void> => {
  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.findByEmail(payload.email.toLowerCase());
  if (!user) {
    throw new HttpError({
      status: HttpCode.BAD_REQUEST,
      message: HttpErrorMessage.NO_SUCH_EMAIL,
    });
  }

  const token = generateAccessToken(user.id);
  const { app } = env;
  const url = `${app.url}/set-password?token=${token}`;

  await sendMail({ to: user.email, subject: 'Reset Password', text: url });
};

export const setPassword = async (payload: ISetPassword): Promise<void> => {
  const userRepository = getCustomRepository(UserRepository);
  const { token, password } = payload;
  if (!token) {
    throw new HttpError({
      status: HttpCode.BAD_REQUEST,
      message: HttpErrorMessage.INVALID_TOKEN,
    });
  }

  const { app } = env;
  const decoded = jwt.verify(token, app.secretKey) as {
    userId: string;
    workspaceId: string;
  };

  const hashedPassword = await hash(password);
  await userRepository.updatePasswordById(decoded.userId, hashedPassword);
};

export const updatePasswordAndFullName = async (
  payload: IUpdatePasswordAndFullName,
): Promise<void> => {
  const userRepository = getCustomRepository(UserRepository);

  const { token, password, fullName } = payload;
  if (!token) {
    throw new HttpError({
      status: HttpCode.BAD_REQUEST,
      message: HttpErrorMessage.INVALID_TOKEN,
    });
  }

  const { app } = env;
  const decoded = jwt.verify(token, app.secretKey) as {
    userId: string;
    workspaceId: string;
  };
  const hashedPassword = await hash(password);
  await userRepository.updatePasswordById(decoded.userId, hashedPassword);
  const userToUpdate = await userRepository.findById(decoded.userId);
  await userRepository.updatePasswordById(decoded.userId, hashedPassword);
  userToUpdate.fullName = fullName || userToUpdate.fullName;
  await userRepository.save(userToUpdate);
};

export const refreshTokens = async (
  payload: IRefreshToken,
): Promise<ITokens> => {
  try {
    const { refreshToken } = payload;
    jwt.verify(refreshToken, env.app.secretKey);
    const refreshTokenRepository = getCustomRepository(RefreshTokenRepository);
    const userRefreshToken = await refreshTokenRepository.findByToken(
      refreshToken,
    );
    if (!userRefreshToken?.token) {
      throw new Error();
    }
    await refreshTokenRepository.remove(userRefreshToken);
    const newFollowingPages = userRefreshToken.user.followingPages?.map(
      (page) => mapPageToIPage(page),
    );
    const newLinks = userRefreshToken.user.links?.map((link) =>
      mapLinkToILink(link),
    );
    const userWithMappedPages = {
      ...userRefreshToken.user,
      followingPages: newFollowingPages,
      links: newLinks,
    };
    const tokens = await setTokens(userWithMappedPages);
    return tokens;
  } catch {
    throw new HttpError({
      status: HttpCode.UNAUTHORIZED,
      message: HttpErrorMessage.UNAUTHORIZED,
    });
  }
};

export const logout = async (payload: IRefreshToken): Promise<void> => {
  const { refreshToken } = payload;
  const refreshTokenRepository = getCustomRepository(RefreshTokenRepository);
  const userRefreshToken = await refreshTokenRepository.findByToken(
    refreshToken,
  );
  if (userRefreshToken?.token) {
    await refreshTokenRepository.remove(userRefreshToken);
  }
};

const loginOtherService = async (
  fullName: string,
  email: string,
  avatar: string,
): Promise<Omit<IUserWithTokens, 'refreshToken'>> => {
  const userRepository = getCustomRepository(UserRepository);

  const user = await userRepository.findByEmail(email);
  if (user) {
    return getIUserWithTokens(user);
  }
  const newUser = await userRepository.save({
    email,
    fullName,
    avatar,
  });
  return getIUserWithTokens(newUser);
};

export const getLoginGoogleUrl = async (
  requestedPage: string | undefined,
): Promise<{ url: string }> => {
  const { clientId, clientSecret, redirectUrl } = env.google;
  const oauth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectUrl,
  );
  const scopes = ['profile', 'email', 'openid'];
  return {
    url: oauth2Client.generateAuthUrl({
      scope: scopes,
      state: requestedPage,
    }),
  };
};

export const loginGoogle = async (
  code: string,
): Promise<Omit<IUserWithTokens, 'refreshToken'>> => {
  const { clientId, clientSecret, redirectUrl } = env.google;
  const oauth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectUrl,
  );
  const { tokens } = await oauth2Client.getToken(code);
  const decodeToken = jwt.decode(tokens.id_token, { json: true });
  const { email, name, picture } = decodeToken;
  return await loginOtherService(name, email, picture);
};

export const getLoginGitHubUrl = async (
  requestedPage: string | undefined,
): Promise<{ url: string }> => {
  const { clientId, redirectUrl } = env.github;
  if (requestedPage) {
    return {
      url: `https://github.com/login/oauth/authorize?state=${requestedPage}&client_id=${clientId}&redirect_uri=${redirectUrl}&scope=repo`,
    };
  } else {
    return {
      url: `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=repo`,
    };
  }
};

export const loginGithub = async (
  code: string,
): Promise<Omit<IUserWithTokens, 'refreshToken'>> => {
  const accessToken = await getAccessToken(code);
  const githubUser = await getUser(accessToken);
  const { email, name, login, avatar_url } = githubUser;

  if (!email) {
    throw new HttpError({
      status: HttpCode.BAD_REQUEST,
      message: HttpErrorMessage.NO_EMAIL,
    });
  }

  return await loginOtherService(name || login, email, avatar_url);
};

const getIUserWithTokens = async (
  user: User,
): Promise<Omit<IUserWithTokens, 'refreshToken'>> => {
  const newFollowingPages = user.followingPages?.map((page) =>
    mapPageToIPage(page),
  );
  const newLinks = user.links?.map((link) => mapLinkToILink(link));
  const userWithMappedPages = {
    ...user,
    followingPages: newFollowingPages,
    links: newLinks,
  };
  const tokens = await setTokens(userWithMappedPages);
  const { id, fullName, email, avatar, title, skills, followingPages, links } =
    userWithMappedPages;
  return {
    id,
    fullName,
    email,
    avatar,
    title,
    skills,
    followingPages,
    links,
    ...tokens,
  };
};
