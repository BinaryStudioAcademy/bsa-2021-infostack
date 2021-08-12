import * as yup from 'yup';
import { titleRegex } from './regex/regex';

export const accountInfoSchema = yup.object().shape({
  fullName: yup
    .string()
    .trim()
    .min(5, 'Full name must be at least 5 characters')
    .max(30, 'Full name must be at most 30 characters')
    .matches(
      titleRegex,
      'Full name must consist of latin letters (upper and lower case), numbers, and symbols',
    )
    .required(),
  title: yup
    .string()
    .min(2, 'Title must be at least 2 character')
    .max(30, 'Title must be at most 30 characters')
    .required(),
});
