/* eslint-disable no-console */
import jwt from 'jsonwebtoken';
import { env } from '../../env';
import { ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN } from '../../config/jwt-config';
import { ITokens } from '../interfaces/auth/tokens.interface';

const { accessSecretKey, refreshSecretKey } = env.app;

const generateAccessToken = (userId: string): string =>
  jwt.sign({ userId }, accessSecretKey, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });

const generateRefreshToken = (): string =>
  jwt.sign({}, refreshSecretKey, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });

const generateTokens = (userId: string): ITokens => {
  return {
    accessToken: generateAccessToken(userId),
    refreshToken: generateRefreshToken(),
  };
};

export { generateAccessToken, generateRefreshToken, generateTokens };
