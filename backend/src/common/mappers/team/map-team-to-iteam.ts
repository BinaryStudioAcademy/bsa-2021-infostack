import { ITeam } from '../../interfaces';
import { Team } from '../../../data/entities';

export const mapTeamToITeam = (team: Team): ITeam => {
  const { id, name, users, owner } = team;
  const mappedUsers = users.map(({ id, fullName, avatar, userWorkspaces }) => ({
    id,
    fullName,
    avatar,
    roleInWorkspace: userWorkspaces[0].role,
  }));
  return { id, name, owner, users: mappedUsers };
};
