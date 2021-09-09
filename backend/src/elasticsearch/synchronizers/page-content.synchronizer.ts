import { getCustomRepository } from 'typeorm';

import { asyncForEach } from '../../common/helpers';
import { PageRepository } from '../../data/repositories';
import { elasticPageContentRepository } from '../repositories';

class ElasticPageContentSynchronizer {
  public static async execute(): Promise<void> {
    const pageRepository = getCustomRepository(PageRepository);
    const pages = await pageRepository.findWithLastContent();

    await asyncForEach(async ({ id: pageId, workspaceId, pageContents }) => {
      const { title, content, id } = pageContents[0];

      await elasticPageContentRepository.upsert({
        id,
        title,
        content,
        pageId,
        workspaceId,
      });
    }, pages);
  }
}

export { ElasticPageContentSynchronizer };
