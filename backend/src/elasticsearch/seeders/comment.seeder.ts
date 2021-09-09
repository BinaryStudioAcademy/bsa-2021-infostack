import { getCustomRepository } from 'typeorm';

import { asyncForEach } from '../../common/helpers';
import { comments } from '../../data/seed-data/comment.data';
import { PageRepository } from '../../data/repositories';
import { elasticCommentRepository } from '../repositories';

class ElasticCommentSeeder {
  private static _insertedCommentIds = new Set<string>();

  public static async execute(): Promise<void> {
    await asyncForEach(async ({ text, pageId, id }) => {
      if (this._insertedCommentIds.has(id)) {
        return;
      }

      const pageRepository = getCustomRepository(PageRepository);
      const { workspaceId } = await pageRepository.findById(pageId);

      await elasticCommentRepository.upsert({
        id,
        text,
        pageId,
        workspaceId,
      });

      this._insertedCommentIds.add(id);
    }, comments.reverse());
  }
}

export { ElasticCommentSeeder };
