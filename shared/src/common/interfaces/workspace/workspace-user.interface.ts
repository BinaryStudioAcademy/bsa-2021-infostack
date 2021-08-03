import { RoleType } from '../../enums';

interface IWorkspaceUser {
  id: string;
  fullName: string;
  role: RoleType;
  teams: string[];
}

export type { IWorkspaceUser };
