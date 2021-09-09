import { getCustomRepository } from 'typeorm';

import { asyncForEach } from '../../common/helpers/array.helper';
import { pageContents } from '../../data/seed-data/page-content.data';

import PageRepository from '../../data/repositories/page.repository';
import elasticPageContentRepository from '../repositories/page-content.repository';

class ElasticPageContentSeeder {
  private static _insertedPageIds = new Set<string>();

  public static async execute(): Promise<void> {
    await asyncForEach(async ({ title, content, pageId, id }) => {
      if (this._insertedPageIds.has(pageId)) {
        return;
      }

      const pageRepository = getCustomRepository(PageRepository);
      const { workspaceId } = await pageRepository.findById(pageId);

      await elasticPageContentRepository.upsert({
        id,
        title,
        content,
        pageId,
        workspaceId,
      });

      this._insertedPageIds.add(pageId);
    }, pageContents.reverse());
  }
}

export default ElasticPageContentSeeder;
