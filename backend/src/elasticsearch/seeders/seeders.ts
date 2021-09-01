import { createConnection } from 'typeorm';

import { logger } from '../../common/utils/logger.util';

import ormconfig from '../../config/ormconfig';
import { env } from '../../env';
import elasticsearchClient from '../elasticsearch';
import ElasticCommentSeeder from './comment.seeder';
import ElasticPageContentSeeder from './page-content.seeder';

const {
  elasticsearch: { index },
} = env;

const seeders = async (): Promise<void> => {
  await createConnection(ormconfig);
  logger.info('Connection created');

  logger.info('Checking if index exist in elastic');
  try {
    await elasticsearchClient.indices.get({
      index,
    });
  } catch (err) {
    const { message } = err;
    if (message.includes('index_not_found_exception')) {
      logger.info('Creating elastic index');

      await elasticsearchClient.indices.create({
        index,
      });
    } else {
      return logger.error(err);
    }
  }

  logger.info('Seeding elastic page contents');
  await ElasticPageContentSeeder.execute();

  logger.info('Seeding elastic comments');
  await ElasticCommentSeeder.execute();

  logger.info('Seeding finished');
};

seeders().then(() => process.exit());
