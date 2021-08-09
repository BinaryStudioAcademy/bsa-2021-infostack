import { comments } from '../seed-data/comment.data';
import { Comment } from '../entities/comment';
import { asyncForEach } from '../../common/helpers/array.helper';

export default class CommentSeeder {
  public static async execute(): Promise<void> {
    await asyncForEach(async (comment) => {
      await Object.assign(new Comment(), { ...comment }).save();
    }, comments);
  }
}
