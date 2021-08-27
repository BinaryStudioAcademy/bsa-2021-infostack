import { ITeam } from '../../interfaces/team';
import { Team } from '../../../data/entities/team';

export const mapTeamToITeamWithoutRoles = (team: Team): ITeam => {
  const { id, name, users, owner } = team;
  const mappedUsers = users.map(({ id, fullName, avatar }) => ({
    id,
    fullName,
    avatar,
  }));
  return { id, name, owner, users: mappedUsers };
};
