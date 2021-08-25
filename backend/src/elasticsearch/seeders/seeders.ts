import { createConnection } from 'typeorm';

import { logger } from '../../common/utils/logger.util';

import ormconfig from '../../config/ormconfig';
import ElasticPageContentSeeder from './page-content.seeder';

const seeders = async (): Promise<void> => {
  await createConnection(ormconfig);
  logger.info('Connection created');
  logger.info('Seeding elastic page contents');
  await ElasticPageContentSeeder.execute();

  logger.info('Seeding finished');
};

seeders().then(() => process.exit());
