import { getCustomRepository } from 'typeorm';

import { asyncForEach } from '../../common/helpers/array.helper';

import PageRepository from '../../data/repositories/page.repository';
import elasticPageContentRepository from '../repositories/page-content.repository';

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

export default ElasticPageContentSynchronizer;
