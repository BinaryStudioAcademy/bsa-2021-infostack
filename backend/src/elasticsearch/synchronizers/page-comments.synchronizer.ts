import { getCustomRepository } from 'typeorm';

import { asyncForEach } from '../../common/helpers/array.helper';
import CommentRepository from '../../data/repositories/comment.repository';
import PageRepository from '../../data/repositories/page.repository';
import elasticCommentRepository from '../repositories/comments.repository';

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

export default ElasticCommentsSynchronizer;
