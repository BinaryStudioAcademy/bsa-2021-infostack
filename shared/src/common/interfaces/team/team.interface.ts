import { IUser } from '../user';

interface ITeam {
  id: string;
  name: string;
  users: IUser[];
}

export type { ITeam };
