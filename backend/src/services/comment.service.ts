import { getRepository } from 'typeorm';
import { Comment } from '../data/entities/comment';

export const getComments = async (id: string): Promise<Comment[]> =>
  await getRepository(Comment)
    .find({ where: { pageId: id } });
