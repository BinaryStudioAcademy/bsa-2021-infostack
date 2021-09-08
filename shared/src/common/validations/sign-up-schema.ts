import * as yup from 'yup';
import { TITLE_REGEX, PASSWORD_REGEX } from './regex';

export const signupSchema = yup
  .object()
  .strict(true)
  .required()
  .noUnknown(true)
  .shape({
    fullName: yup
      .string()
      .trim()
      .min(5)
      .max(30)
      .matches(
        TITLE_REGEX,
        'full name must consist of latin letters (upper and lower case), numbers, and symbols',
      )
      .required(),
    email: yup.string().email().required(),
    password: yup
      .string()
      .min(6)
      .max(12)
      .matches(
        PASSWORD_REGEX,
        'password must consist of latin letters (upper and lower case), numbers, and symbols',
      )
      .required(),
  });
