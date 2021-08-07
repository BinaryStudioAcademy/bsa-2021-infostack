import { ITeam } from '../../interfaces/team/team.interface';
import { Workspace } from '../../../data/entities/workspace';

export const mapWorkspaceToTeams = (
  workspace: Workspace,
): ITeam[] => {
  return workspace.teams.map(({ id, name, workspaceId, users }) => ({
    id,
    name,
    workspaceId,
    users: users.map(({ id, fullName, avatar }) => ({ id, fullName, avatar })),
  }));
};
