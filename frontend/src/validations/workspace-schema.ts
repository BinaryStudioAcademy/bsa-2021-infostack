import * as yup from 'yup';

export const workspaceSchema = yup.object().shape({
  workspaceTitle: yup
    .string()
    .trim()
    .min(2, 'Workspace title must be at least 2 characters')
    .max(50, 'Workspace title must be at most 30 characters')
    .required(),
});
