import { RoleType } from '../../../common/enums';

interface ITeamUser {
  id: string;
  fullName: string;
  avatar: string;
  roleInWorkspace?: RoleType;
}

export type { ITeamUser };
