import { ITeam } from '../../interfaces/team/team.interface';
import { Team } from '../../../data/entities/team';

export const mapTeamToITeam = (team: Team): ITeam => {
  const { id, name, users } = team;
  const mappedUsers = users.map(({ id, fullName, avatar }) => ({
    id,
    fullName,
    avatar,
  }));
  return { id, name, users: mappedUsers };
};
