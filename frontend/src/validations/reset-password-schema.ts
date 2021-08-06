import * as yup from 'yup';

export const resetPasswordSchema = yup.object().shape({
  email: yup.string().email().required(),
});
