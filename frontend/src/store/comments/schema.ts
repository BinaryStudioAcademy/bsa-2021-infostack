import { schema } from 'normalizr';

const comment = new schema.Entity('comments');
comment.define({
  children: [comment],
});

export const commentListSchema = new schema.Array(comment);
