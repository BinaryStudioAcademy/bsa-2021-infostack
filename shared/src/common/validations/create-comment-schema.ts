import * as yup from 'yup';

export const createCommentSchema = yup
  .object()
  .strict(true)
  .required()
  .noUnknown(true)
  .shape({
    text: yup
      .string()
      .when('voiceRecord', {
        is: yup.string().min(1),
        then: yup.string(),
      })
      .when('voiceRecord', {
        is: undefined,
        then: yup.string().min(1).required(),
      }),
    voiceRecord: yup.string().min(1),
    mentionIds: yup.array().of(yup.string().uuid()).required(),
    parentCommentId: yup.string().uuid(),
  });
