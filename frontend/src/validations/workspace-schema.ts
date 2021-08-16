import * as yup from 'yup';

export const workspaceSchema = yup.object().shape({
  title: yup.string().trim().min(2).max(50).required(),
});
