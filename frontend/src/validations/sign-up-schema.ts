import * as yup from 'yup';
import { titleRegex } from './regex/regex';

export const signUpSchema = yup.object().shape({
  fullName: yup
    .string()
    .trim()
    .min(5)
    .max(30)
    .matches(
      titleRegex,
      'fullName must consist of latin letters (upper and lower case), numbers, and symbols',
    )
    .required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(6)
    .max(12)
    .matches(
      titleRegex,
      'password must consist of latin letters (upper and lower case), numbers, and symbols',
    )
    .required(),
});
