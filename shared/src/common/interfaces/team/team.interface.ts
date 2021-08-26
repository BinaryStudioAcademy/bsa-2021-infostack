import { ITeamUser } from './team-user.interface';

interface ITeam {
  id: string;
  name: string;
  owner: string;
  users: ITeamUser[];
}

export type { ITeam };
