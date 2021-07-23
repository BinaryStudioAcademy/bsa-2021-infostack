import Cryptr from 'cryptr';
import { env } from '../../env';

const cryptr = new Cryptr(env.app.secretKey);

export const encrypt = (id: string): string => cryptr.encrypt(id);

export const decrypt = (encrypted: string): string | null => {
  try {
    return cryptr.decrypt(encrypted);
  } catch {
    return null;
  }
};
