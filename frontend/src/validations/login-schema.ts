import * as yup from 'yup';
import { titleRegex } from './regex/regex';

export const loginSchema = yup.object().shape({
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
