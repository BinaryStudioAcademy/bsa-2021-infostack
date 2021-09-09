import { getCustomRepository } from 'typeorm';

import { asyncForEach } from '../../common/helpers';
import { PageRepository, TagRepository } from '../repositories';
import { pageTags } from '../seed-data/page-tag.data';

export class PageTagSeeder {
  public static async execute(): Promise<void> {
    const pageRepository = getCustomRepository(PageRepository);
    const tagRepository = getCustomRepository(TagRepository);
    await asyncForEach(async (pageTag) => {
      const page = await pageRepository.findById(pageTag.pageId);
      const tag = await tagRepository.findById(pageTag.tagId);
      page.tags = [tag];

      await pageRepository.save(page);
    }, pageTags);
  }
}
