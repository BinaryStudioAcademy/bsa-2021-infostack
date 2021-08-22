import * as yup from 'yup';
import { passwordRegex } from './regex/regex';

export const loginSchema = yup
  .object()
  .strict(true)
  .required()
  .noUnknown(true)
  .shape({
    email: yup.string().email().required(),
    password: yup
      .string()
      .min(6)
      .max(12)
      .matches(
        passwordRegex,
        'password must consist of latin letters (upper and lower case), numbers, and symbols',
      )
      .required(),
  });
