import * as yup from 'yup';

export const createCommentSchema = yup
  .object()
  .strict(true)
  .required()
  .noUnknown(true)
  .shape({
    text: yup.string().min(1).required(),
    mentionIds: yup.array().of(yup.string().uuid()).required(),
    parentCommentId: yup.string().uuid(),
  });