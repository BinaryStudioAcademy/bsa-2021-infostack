/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken';
import { env } from '../../env';
import {
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
  INVITE_TOKEN_EXPIRES_IN,
} from '../../config/jwt-config';
import { ITokens } from '../interfaces/auth';

const { secretKey } = env.app;

const generateAccessToken = (userId: string): string =>
  jwt.sign({ userId }, secretKey, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });

const generateInviteToken = (userId: string, workspaceId: string): string =>
  jwt.sign({ userId, workspaceId }, secretKey, {
    expiresIn: INVITE_TOKEN_EXPIRES_IN,
  });

const generateRefreshToken = (): string =>
  jwt.sign({}, secretKey, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });

const generateTokens = (userId: string): ITokens => {
  return {
    accessToken: generateAccessToken(userId),
    refreshToken: generateRefreshToken(),
  };
};

const generateGithubAccessToken = (token: string): string =>
  jwt.sign({ token }, secretKey);

const decodeToken = (token: string): any =>
  jwt.verify(token, env.app.secretKey);

export {
  generateAccessToken,
  generateRefreshToken,
  generateTokens,
  generateInviteToken,
  generateGithubAccessToken,
  decodeToken,
};
