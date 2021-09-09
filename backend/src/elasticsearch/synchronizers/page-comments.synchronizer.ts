import { getCustomRepository } from 'typeorm';

import { asyncForEach } from '../../common/helpers';
import { PageRepository, CommentRepository } from '../../data/repositories';
import { elasticCommentRepository } from '../repositories';

class ElasticCommentsSynchronizer {
  public static async execute(): Promise<void> {
    const comments = await getCustomRepository(CommentRepository).find();

    await asyncForEach(async ({ pageId, text, id }) => {
      const pageRepository = getCustomRepository(PageRepository);
      const { workspaceId } = await pageRepository.findById(pageId);

      await elasticCommentRepository.upsert({
        id,
        text,
        pageId,
        workspaceId,
      });
    }, comments);
  }
}

export { ElasticCommentsSynchronizer };
