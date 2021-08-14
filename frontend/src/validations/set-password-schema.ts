import * as yup from 'yup';
import { passwordRegex } from './regex/regex';

export const setPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(6)
    .max(12)
    .matches(
      passwordRegex,
      'password must consist of latin letters (upper and lower case), numbers, and symbols',
    )
    .required(),
  passwordRepeat: yup
    .string()
    .oneOf(
      [yup.ref('password'), null],
      //prettier-ignore
      'passwords don\'t match',
    )
    .required('required'),
});
