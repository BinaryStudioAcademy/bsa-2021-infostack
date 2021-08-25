import { createConnection } from 'typeorm';

import { logger } from '../../common/utils/logger.util';

import ormconfig from '../../config/ormconfig';
import { env } from '../../env';
import elasticsearchClient from '../elasticsearch';
import ElasticPageContentSeeder from './page-content.seeder';

const {
  elasticsearch: { index },
} = env;

const seeders = async (): Promise<void> => {
  await createConnection(ormconfig);
  logger.info('Connection created');

  logger.info('Checking if elastic index exist');
  const { body } = await elasticsearchClient.indices.get({
    index: env.elasticsearch.index,
  });

  if (!body[index]) {
    logger.info('Creating elastic index');

    await elasticsearchClient.indices.create({
      index: env.elasticsearch.index,
    });
  }

  logger.info('Seeding elastic page contents');
  await ElasticPageContentSeeder.execute();

  logger.info('Seeding finished');
};

seeders().then(() => process.exit());