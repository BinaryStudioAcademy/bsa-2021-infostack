import { Request } from 'express';
import { RoleType } from '~/common/enums/role-type';

export interface IRequestWithUser extends Request {
  userId?: string;
  role?: RoleType;
  workspaceId?: string;
}
