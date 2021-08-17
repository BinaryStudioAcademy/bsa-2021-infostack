import * as yup from 'yup';
import { titleRegex, passwordRegex } from './regex/regex';

export const signUpInviteSchema = yup.object().shape({
  fullName: yup
    .string()
    .trim()
    .min(5)
    .max(30)
    .matches(
      titleRegex,
      'full name must consist of latin letters (upper and lower case), numbers, and symbols',
    )
    .required(),
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
