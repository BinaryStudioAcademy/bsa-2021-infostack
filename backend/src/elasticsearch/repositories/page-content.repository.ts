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
  public async index(
    body: IElasticPageContent,
  ): Promise<
    TransportRequestPromise<
      ApiResponse<estypes.IndexRequest<IElasticPageContent>, unknown>
    >
  > {
    return elasticsearchClient.index<estypes.IndexRequest<IElasticPageContent>>(
      {
        index,
        body,
      },
    );
  }

  public async updateByPageId(
    pageId: string,
    {
      id,
      title,
      content,
    }: Pick<IElasticPageContent, 'id' | 'title' | 'content'>,
  ): Promise<ApiResponse<Record<string, any>, unknown>> {
    return elasticsearchClient.updateByQuery({
      index: env.elasticsearch.index,
      body: {
        query: {
          bool: {
            must: {
              match: {
                pageId,
              },
            },
          },
        },
        script: {
          params: {
            id,
            title,
            content,
          },
          source:
            "ctx._source.id = params['id']; ctx._source.title = params['title']; ctx._source.content = params['content'];",
          lang: 'painless',
        },
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
    return elasticsearchClient.deleteByQuery<IElasticPageContent>({
      index,
      body: {
        query: {
          match: { pageId },
        },
      },
    });
  }
}

const elasticPageContentRepository = new ElasticPageContentRepository();

export default elasticPageContentRepository;
