import jwt from 'jsonwebtoken';
import { env } from '../../env';

const { secretKey } = env.app;
const ACCESS_TOKEN_TTL = '1d';

const generateAccessToken = (userId: string): string =>
  jwt.sign({ userId }, secretKey, { expiresIn: ACCESS_TOKEN_TTL });

export { generateAccessToken };
