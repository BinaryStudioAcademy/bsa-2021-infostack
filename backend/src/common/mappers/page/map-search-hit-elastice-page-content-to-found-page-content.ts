import { Hit } from '@elastic/elasticsearch/api/types';

import { IElasticPageContentAndComments } from '../../../elasticsearch';
import { IFoundPageContent } from '../../interfaces/page';

const mapSearchHitElasticPageContentToFoundPageContent = (
  hits: Hit<IElasticPageContentAndComments>[],
): Partial<IFoundPageContent>[] => {
  return hits
    .map(({ highlight, _source }) => {
      const results: Partial<IFoundPageContent>[] = [];

      if (highlight?.title?.length) {
        const titles: Array<Partial<IFoundPageContent>> = highlight.title.map(
          (title) => {
            return {
              id: _source.id,
              pageId: _source.pageId,
              title: title,
            };
          },
        );

        results.push(...titles);
      }

      if (highlight?.content?.length && !highlight?.title) {
        const contents = highlight?.content.map((content) => {
          return {
            id: _source.id,
            pageId: _source.pageId,
            content: content,
            title: _source.title,
          };
        });

        results.push(...contents);
      }

      if (highlight?.text?.length) {
        const comments = highlight?.text.map((text) => {
          return {
            id: _source.pageId,
            pageId: _source.pageId,
            text: text,
          };
        });

        results.push(...comments);
      }

      return results;
    })
    .flat();
};

export default mapSearchHitElasticPageContentToFoundPageContent;
