import * as yup from 'yup';
import { titleRegex } from './regex/regex';

export const setPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(6)
    .max(12)
    .matches(
      titleRegex,
      'password must consist of latin letters (upper and lower case), numbers, and symbols',
    )
    .required(),
  passwordRepeat: yup
    .string()
    .oneOf([yup.ref('password'), null], `passwords don't match`)
    .required('Required'),
});
