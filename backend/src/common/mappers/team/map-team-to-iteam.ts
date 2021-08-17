import { ITeam } from '../../interfaces/team';
import { Team } from '../../../data/entities/team';

export const mapTeamsToITeams = (teams: Team[]): ITeam[] => {
  const teamsWithRoles = teams.map((team) => {
    const { id, name, users } = team;

    const mappedUsers = users.map(
      ({ id, fullName, avatar, userWorkspaces }) => ({
        id,
        fullName,
        avatar,
        roleInWorkspace: userWorkspaces[0].role,
      }),
    );
    return { id, name, users: mappedUsers };
  });

  return teamsWithRoles;
};

export const mapTeamToITeam = (team: Team): ITeam => {
  const { id, name, users } = team;
  const mappedUsers = users.map(({ id, fullName, avatar, userWorkspaces }) => ({
    id,
    fullName,
    avatar,
    roleInWorkspace: userWorkspaces[0].role,
  }));
  return { id, name, users: mappedUsers };
};
