import * as yup from 'yup';
import { ParticipantType, PermissionType } from '../enums';

export const setPermissionsSchema = yup
  .object()
  .strict(true)
  .required()
  .noUnknown(true)
  .shape({
    id: yup.string().uuid(),
    name: yup.string().trim().min(1).max(200),
    type: yup
      .string()
      .trim()
      .min(1)
      .oneOf(Object.values(ParticipantType))
      .required(),
    role: yup
      .string()
      .trim()
      .min(1)
      .oneOf(Object.values(PermissionType))
      .required(),
  });
