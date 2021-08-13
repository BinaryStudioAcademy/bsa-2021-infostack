import * as yup from 'yup';

export const teamNameSchema = yup.object().shape({
  name: yup.string().min(2).max(15).required(),
});
