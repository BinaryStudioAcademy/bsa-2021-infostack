import { ITeam } from '../../interfaces';
import { Team } from '../../../data/entities';

export const mapTeamToITeamWithoutRoles = (team: Team): ITeam => {
  const { id, name, users, owner } = team;
  const mappedUsers = users.map(({ id, fullName, avatar }) => ({
    id,
    fullName,
    avatar,
  }));
  return { id, name, owner, users: mappedUsers };
};
