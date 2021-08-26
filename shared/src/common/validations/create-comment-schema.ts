import * as yup from 'yup';

export const createCommentSchema = yup
  .object()
  .strict(true)
  .required()
  .noUnknown(true)
  .shape({
    text: yup.string().min(1).required(),
    voiceRecord: yup.string().min(1),
    parentCommentId: yup.string().min(1),
  });
