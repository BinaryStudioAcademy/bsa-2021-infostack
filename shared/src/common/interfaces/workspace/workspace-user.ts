import { RoleType } from '../../enums';

interface IWorkspaceUser {
  id: string;
  name: string;
  role: RoleType;
  team?: string;
}

export type { IWorkspaceUser };
