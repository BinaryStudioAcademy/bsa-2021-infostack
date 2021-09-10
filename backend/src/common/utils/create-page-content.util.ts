import { randomUUID } from 'crypto';
import { add } from 'date-fns';

import { PageContent } from '../types/page-content.type';
import { users } from '../../data/seed-data/users';
import { getRandomFromArray } from './get-random-from-array.util';

export const createPageContent = (
  content: string[],
  pageId: string,
  title: string,
  startDate: Date,
): PageContent[] =>
  content.map((_, index, array) => ({
    id: randomUUID(),
    pageId,
    authorId: getRandomFromArray(users).id,
    title,
    createdAt: add(startDate, {
      minutes: 30 * index,
    }),
    content: array.slice(0, index + 1).join('\n'),
  }));
