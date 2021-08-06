import crypto from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(crypto.scrypt);
const KEY_LENGTH = 40;

const hash = async (value: string): Promise<string> => {
  const salt = crypto.randomBytes(8).toString('hex');
  const derivedKey = (await scrypt(value, salt, KEY_LENGTH)) as Buffer;
  return salt + ':' + derivedKey.toString('hex');
};

const verify = async (value: string, hash: string): Promise<boolean> => {
  const [salt, key] = hash.split(':');
  const keyBuffer = Buffer.from(key, 'hex');
  const derivedKey = (await scrypt(value, salt, KEY_LENGTH)) as Buffer;
  return crypto.timingSafeEqual(keyBuffer, derivedKey);
};

export { hash, verify };
