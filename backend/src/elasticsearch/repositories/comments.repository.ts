import { ApiResponse } from '@elastic/elasticsearch/lib/Transport';

import elasticsearchClient from '../elasticsearch';
import { env } from '../../env';
import { IElasticPageContentAndComments } from '../entities';

const {
  elasticsearch: { index },
} = env;

class ElasticCommentRepository {
  public async upsert(
    comment: IElasticPageContentAndComments,
  ): Promise<ApiResponse<IElasticPageContentAndComments, unknown>> {
    return elasticsearchClient.update<IElasticPageContentAndComments>({
      index,
      id: comment.id,
      body: {
        doc: comment,
        doc_as_upsert: true,
      },
    });
  }

  public async deleteById(
    id: string,
  ): Promise<ApiResponse<IElasticPageContentAndComments, unknown>> {
    return elasticsearchClient.delete<IElasticPageContentAndComments>({
      index,
      id,
    });
  }
}

const elasticCommentRepository = new ElasticCommentRepository();

export default elasticCommentRepository;
