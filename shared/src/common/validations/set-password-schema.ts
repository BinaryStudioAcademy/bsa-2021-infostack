import * as yup from 'yup';
import { PASSWORD_REGEX } from './regex';

export const setPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(6)
    .max(12)
    .matches(
      PASSWORD_REGEX,
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
