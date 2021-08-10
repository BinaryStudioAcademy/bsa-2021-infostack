import { ITeamUser } from '../../interfaces/team/team.interface';
import { IUser } from '../../interfaces/user/user-auth.interface';

export const mapUsersToTeamUsers = (
  users: IUser[],
): ITeamUser[] => {
  return users.map(({ id, fullName, avatar }) => ({ id, fullName, avatar }));
};
