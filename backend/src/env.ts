import * as dotenv from 'dotenv';
import { getOsEnv } from './common/helpers/path.helper';

dotenv.config();

export const env = {
  app: {
    port: getOsEnv('PORT'),
    secretKey: getOsEnv('APP_SECRET'),
  },
  s3: {
    accessKeyId: getOsEnv('AWS_ACCESS_KEY'),
    secretAccessKey: getOsEnv('AWS_SECRET_KEY'),
    bucketName: getOsEnv('AWS_BUCKET_NAME'),
  },
} as const;
