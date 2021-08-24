import * as yup from 'yup';
import { titleRegex } from './regex/regex';

export const createPageSchema = yup
  .object()
  .strict(true)
  .required()
  .noUnknown(true)
  .shape({
    title: yup
      .string()
      .trim()
      .min(1)
      .max(50)
      .matches(
        titleRegex,
        'title must consist min 1 up to 50 latin letters or numbers',
      )
      .required(),
    content: yup.string(),
    parentPageId: yup.string().uuid(),
  });
