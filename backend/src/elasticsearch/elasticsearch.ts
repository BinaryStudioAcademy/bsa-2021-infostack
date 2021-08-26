import { Client } from '@elastic/elasticsearch';

import { env } from '../env';

const { elasticsearch } = env;

const elasticsearchClient = new Client({ node: elasticsearch.node });

export default elasticsearchClient;
