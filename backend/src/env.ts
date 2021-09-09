import * as dotenv from 'dotenv';
import { checkIsStringTrue } from './common/helpers/boolean.helper';
import { getOsEnv } from './common/helpers/path.helper';

dotenv.config();

export const env = {
  app: {
    port: getOsEnv('PORT'),
    socketPort: getOsEnv('SOCKET_PORT'),
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
    synchronize: checkIsStringTrue(getOsEnv('TYPEORM_SYNCHRONIZE')),
    migrationsRun: checkIsStringTrue(getOsEnv('TYPEORM_MIGRATIONS_RUN')),
    migrationsDir: getOsEnv('TYPEORM_MIGRATIONS'),
    enititiesDir: getOsEnv('TYPEORM_ENTITIES'),
    logging: checkIsStringTrue(getOsEnv('TYPEORM_LOGGING')),
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
      clientId: getOsEnv('MAILER_AUTH_CLIENT_ID'),
      clientSecret: getOsEnv('MAILER_AUTH_CLIENT_SECRET'),
      refreshToken: getOsEnv('MAILER_AUTH_REFRESH_TOKEN'),
    },
  },
  google: {
    clientId: getOsEnv('GOOGLE_CLIENT_ID'),
    clientSecret: getOsEnv('GOOGLE_CLIENT_SECRET'),
    redirectUrl: getOsEnv('GOOGLE_REDIRECT_URL'),
  },
  github: {
    clientId: getOsEnv('GITHUB_CLIENT_ID'),
    clientSecret: getOsEnv('GITHUB_CLIENT_SECRET'),
    redirectUrl: getOsEnv('GITHUB_REDIRECT_URL'),
    prWebhookCallbackUrl: getOsEnv('GITHUB_PR_WEBHOOK_URL'),
    labelWebhookCallbackUrl: getOsEnv('GITHUB_LABEL_WEBHOOK_URL'),
  },
  elasticsearch: {
    node: getOsEnv('ELASTICSEARCH_NODE'),
    index: getOsEnv('ELASTICSEARCH_INDEX'),
  },
};
