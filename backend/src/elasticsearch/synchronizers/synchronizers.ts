import { createConnection } from 'typeorm';

import { logger } from '../../common/utils/logger.util';

import ormconfig from '../../config/ormconfig';
import ElasticCommentsSynchronizer from './page-comments.synchronizer';
import ElasticPageContentSynchronizer from './page-content.synchronizer';

const synchronizers = async (): Promise<void> => {
  await createConnection(ormconfig);
  logger.info('Connection created');

  logger.info('Synchronizing elastic with db page contents');
  await ElasticPageContentSynchronizer.execute();

  logger.info('Synchronizing elastic with db comments');
  await ElasticCommentsSynchronizer.execute();

  logger.info('Elastic synchronize with db finished');
};

synchronizers().then(() => process.exit());
