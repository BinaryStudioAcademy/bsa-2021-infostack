import { schema } from 'normalizr';

const comment = new schema.Entity(
  'comments',
  {},
  {
    idAttribute: 'id',
  },
);
comment.define({
  children: [comment],
});

export const commentListSchema = new schema.Array(comment);
