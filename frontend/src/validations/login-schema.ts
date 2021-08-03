import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(3).max(12).required(),
});
