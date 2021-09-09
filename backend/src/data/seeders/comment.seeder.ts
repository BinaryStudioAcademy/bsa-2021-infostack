import { comments } from '../seed-data/comment.data';
import { Comment } from '../entities';
import { asyncForEach } from '../../common/helpers';

export class CommentSeeder {
  public static async execute(): Promise<void> {
    await asyncForEach(async (comment) => {
      await Object.assign(new Comment(), { ...comment }).save();
    }, comments);
  }
}
