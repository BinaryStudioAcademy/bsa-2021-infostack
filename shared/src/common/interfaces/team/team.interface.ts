import { ITeamUser } from './team-user.interface';

interface ITeam {
  id: string;
  workspaceId: string;
  name: string;
  users: ITeamUser[];
}

export type { ITeam };
