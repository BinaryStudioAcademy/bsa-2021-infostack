import * as dotenv from 'dotenv';
import { isStringTrue } from './common/helpers/boolean.helper';
import { getOsEnv } from './common/helpers/path.helper';

dotenv.config();

export const env = {
  app: {
    port: getOsEnv('PORT'),
    url: getOsEnv('APP_URL'),
    secretKey: getOsEnv('APP_SECRET'),
    nodeEnv: getOsEnv('NODE_ENV'),
  },
  db: {
    url: getOsEnv('DATABASE_URL'),
    connection: getOsEnv('TYPEORM_CONNECTION'),
    host: getOsEnv('TYPEORM_HOST'),
    port: Number(getOsEnv('TYPEORM_PORT')),
    username: getOsEnv('TYPEORM_USERNAME'),
    password: getOsEnv('TYPEORM_PASSWORD'),
    name: getOsEnv('TYPEORM_DATABASE'),
    synchronize: isStringTrue(getOsEnv('TYPEORM_SYNCHRONIZE')),
    migrationsRun: isStringTrue(getOsEnv('TYPEORM_MIGRATIONS_RUN')),
    migrationsDir: getOsEnv('TYPEORM_MIGRATIONS'),
    enititiesDir: getOsEnv('TYPEORM_ENTITIES'),
    logging: isStringTrue(getOsEnv('TYPEORM_LOGGING')),
  },
  s3: {
    accessKeyId: getOsEnv('AWS_ACCESS_KEY'),
    secretAccessKey: getOsEnv('AWS_SECRET_KEY'),
    bucketName: getOsEnv('AWS_BUCKET_NAME'),
  },
  mailer: {
    service: getOsEnv('MAILER_SERVICE'),
    auth: {
      user: getOsEnv('MAILER_AUTH_USER'),
      pass: getOsEnv('MAILER_AUTH_PASS'),
    },
  },
} as const;
