import { getCustomRepository } from 'typeorm';
import jwt from 'jsonwebtoken';
import { HttpError } from '../common/errors/http-error';
import { HttpCode } from '../common/enums/http-code';
import { IUserWithTokens, IUser } from '../common/interfaces/user';
import {
  generateTokens,
  generateAccessToken,
} from '../common/utils/tokens.util';
import UserRepository from '../data/repositories/user.repository';
import RefreshTokenRepository from '../data/repositories/refresh-token.repository';
import { hash, verify } from '../common/utils/hash.util';
import { HttpErrorMessage } from '../common/enums/http-error-message';
import { sendMail } from '../common/utils/mailer.util';
import { getAccessToken, getUser } from '../common/utils/github.util';
import {
  IResetPassword,
  IRegister,
  IRefreshToken,
  ITokens,
  ILogin,
  ISetPassword,
  IUpdatePasswordAndFullName,
} from '../common/interfaces/auth';
import { env } from '../env';
import { mapPageToIPage } from '../common/mappers/page/map-page-to-ipage';
import { google } from 'googleapis';
import { User } from '~/data/entities/user';
import { mapLinkToILink } from '../common/mappers/link/map-link-to-ilink';

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
  body: IRegister,
): Promise<Omit<IUserWithTokens, 'refreshToken'>> => {
  const userRepository = getCustomRepository(UserRepository);
  const existingUser = await userRepository.findByEmail(
    body.email.toLowerCase(),
  );

  if (existingUser && existingUser.password !== null) {
    throw new HttpError({
      status: HttpCode.CONFLICT,
      message: HttpErrorMessage.EMAIL_ALREADY_EXISTS,
    });
  }

  const hashedPassword = await hash(body.password);
  const userData = {
    ...body,
    email: body.email.toLowerCase(),
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
  body: ILogin,
): Promise<Omit<IUserWithTokens, 'refreshToken'>> => {
  const userRepository = getCustomRepository(UserRepository);

  const user = await userRepository.findByEmail(body.email.toLowerCase());
  if (!user || user.password === null) {
    throw new HttpError({
      status: HttpCode.BAD_REQUEST,
      message: HttpErrorMessage.INVALID_LOGIN_DATA,
    });
  }

  const isPasswordCorrect = await verify(body.password, user.password);
  if (!isPasswordCorrect) {
    throw new HttpError({
      status: HttpCode.BAD_REQUEST,
      message: HttpErrorMessage.INVALID_LOGIN_DATA,
    });
  }

  return getIUserWithTokens(user);
};

export const resetPassword = async (body: IResetPassword): Promise<void> => {
  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.findByEmail(body.email.toLowerCase());
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

export const setPassword = async (body: ISetPassword): Promise<void> => {
  const userRepository = getCustomRepository(UserRepository);
  const { token, password } = body;
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
  body: IUpdatePasswordAndFullName,
): Promise<void> => {
  const userRepository = getCustomRepository(UserRepository);

  const { token, password, fullName } = body;
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

export const refreshTokens = async (body: IRefreshToken): Promise<ITokens> => {
  try {
    const { refreshToken } = body;
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

export const logout = async (body: IRefreshToken): Promise<void> => {
  const { refreshToken } = body;
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
