import * as yup from 'yup';
import { passwordRegex, fullNameRegex } from './regex/regex';

export const signUpSchema = yup.object().shape({
  fullName: yup
    .string()
    .trim()
    .min(5)
    .max(30)
    .matches(
      fullNameRegex,
      'fullName must consist of latin letters (upper and lower case), numbers, and symbols',
    )
    .required(),
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
