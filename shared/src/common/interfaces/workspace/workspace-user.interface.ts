import { RoleType } from '../../enums';
import { InviteStatus } from '../../enums';

interface IWorkspaceUser {
  id: string;
  fullName: string;
  email: string;
  role: RoleType;
  teams: string[];
  status: InviteStatus;
}

export type { IWorkspaceUser };
