import { estypes } from '@elastic/elasticsearch';
import { SearchResponse } from '@elastic/elasticsearch/api/types';
import {
  ApiResponse,
  TransportRequestPromise,
} from '@elastic/elasticsearch/lib/Transport';

import { IElasticPageContentAndComments } from '../entities';
import elasticsearchClient from '../elasticsearch';
import { env } from '../../env';

const {
  elasticsearch: { index },
} = env;

class ElasticPageContentRepository {
  public async upsert(
    pageContent: IElasticPageContentAndComments,
  ): Promise<ApiResponse<IElasticPageContentAndComments, unknown>> {
    return elasticsearchClient.update<IElasticPageContentAndComments>({
      index,
      id: pageContent.pageId,
      body: {
        doc: pageContent,
        doc_as_upsert: true,
      },
    });
  }

  public async search(
    query: string,
    workspaceId: string,
  ): Promise<
    TransportRequestPromise<
      ApiResponse<
        estypes.SearchResponse<IElasticPageContentAndComments>,
        unknown
      >
    >
  > {
    return elasticsearchClient.search<
      SearchResponse<IElasticPageContentAndComments>
    >({
      index: env.elasticsearch.index,
      body: {
        query: {
          bool: {
            must: [
              {
                query_string: {
                  query: `*${query}*`,
                  fields: ['title', 'content', 'text'],
                },
              },
              {
                match: {
                  workspaceId,
                },
              },
            ],
          },
        },
        highlight: {
          fields: {
            title: { pre_tags: [''], post_tags: [''], 'fragment_size': 35 },
            content: { pre_tags: [''], post_tags: [''], 'fragment_size': 35 },
            text: { pre_tags: [''], post_tags: [''], 'fragment_size': 35 },
          },
        },
      },
    });
  }

  public async deleteByPageId(
    pageId: string,
  ): Promise<ApiResponse<IElasticPageContentAndComments, unknown>> {
    return elasticsearchClient.delete<IElasticPageContentAndComments>({
      index,
      id: pageId,
    });
  }
}

const elasticPageContentRepository = new ElasticPageContentRepository();

export default elasticPageContentRepository;
