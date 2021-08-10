import { ITeam } from '../../interfaces/team/team.interface';
import { Team } from '../../../data/entities/team';

export const mapTeams = (
  teams: Team[],
): ITeam[] => {
  return teams.map(({ id, name, workspaceId, users }) => ({
    id,
    name,
    workspaceId,
    users: users.map(({ id, fullName, avatar }) => ({ id, fullName, avatar })),
  }));
};
