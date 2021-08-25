import { estypes } from '@elastic/elasticsearch';
import { SearchResponse } from '@elastic/elasticsearch/api/types';
import {
  ApiResponse,
  TransportRequestPromise,
} from '@elastic/elasticsearch/lib/Transport';

import { IElasticPageContent } from '../entities';
import elasticsearchClient from '../elasticsearch';
import { env } from '../../env';

const {
  elasticsearch: { index },
} = env;

class ElasticPageContentRepository {
  private _type = 'pageContent';

  public async upsert(
    pageContent: IElasticPageContent,
  ): Promise<ApiResponse<IElasticPageContent, unknown>> {
    return elasticsearchClient.update<IElasticPageContent>({
      index,
      type: this._type,
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
      ApiResponse<estypes.SearchResponse<IElasticPageContent>, unknown>
    >
  > {
    return elasticsearchClient.search<SearchResponse<IElasticPageContent>>({
      index: env.elasticsearch.index,
      type: this._type,
      body: {
        query: {
          bool: {
            must: [
              { multi_match: { query, fields: ['title', 'content'] } },
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
            title: { pre_tags: [''], post_tags: [''], 'fragment_size': 15 },
            content: { pre_tags: [''], post_tags: [''], 'fragment_size': 15 },
          },
        },
      },
    });
  }

  public async deleteByPageId(
    pageId: string,
  ): Promise<ApiResponse<IElasticPageContent, unknown>> {
    return elasticsearchClient.delete<IElasticPageContent>({
      index,
      type: this._type,
      id: pageId,
    });
  }
}

const elasticPageContentRepository = new ElasticPageContentRepository();

export default elasticPageContentRepository;
