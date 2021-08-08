import { getCustomRepository } from 'typeorm';
import { IWorkspaceUser } from '../common/interfaces/workspace/workspace-user';
import { ITeam, ITeamCreation } from '../common/interfaces/team/team.interface';
import {
  IWorkspace,
  IWorkspaceCreation,
} from 'infostack-shared/common/interfaces';
import { mapWorkspaceToWorkspaceUsers } from '../common/mappers/workspace/map-workspace-to-workspace-users';
import { mapWorkspaceToTeams } from '../common/mappers/team/map-workspace-to-teams';
import WorkspaceRepository from '../data/repositories/workspace.repository';
import UserWorkspaceRepository from '../data/repositories/user-workspace.repository';
import UserRepository from '../data/repositories/user.repository';
import { RoleType } from '../common/enums/role-type';
import TeamRepository from '../data/repositories/team.repository';

export const getWorkspaceTeams = async (
  workspaceId: string,
): Promise<ITeam[]> => {
  const workspaceRepository = getCustomRepository(WorkspaceRepository);
  const workspace = await workspaceRepository.findByIdWithTeams(workspaceId);
  return mapWorkspaceToTeams(workspace);
};
import { IWorkspaceUserRole } from '../common/interfaces/workspace/workspace-user-role';
import { HttpError } from '../common/errors/http-error';
import { HttpCode } from '../common/enums/http-code';
import { HttpErrorMessage } from '../common/enums/http-error-message';

export const getWorkspaceUsers = async (
  workspaceId: string,
): Promise<IWorkspaceUser[]> => {
  const workspaceRepository = getCustomRepository(WorkspaceRepository);
  const workspace = await workspaceRepository.findByIdWithUsers(workspaceId);
  return mapWorkspaceToWorkspaceUsers(workspace);
};

export const getWorkspaceUserRole = async (
  userId: string,
  workspaceId: string,
): Promise<IWorkspaceUserRole> => {
  const userWorkspaceRepository = getCustomRepository(UserWorkspaceRepository);
  const userWorkspace =
    await userWorkspaceRepository.findByUserIdAndWorkspaceId(
      userId,
      workspaceId,
    );

  return { role: userWorkspace.role };
};

export const getAll = async (userId: string): Promise<IWorkspace[]> => {
  const userWorkspaceRepository = getCustomRepository(UserWorkspaceRepository);
  const usersWorkspaces = await userWorkspaceRepository.findUserWorkspaces(
    userId,
  );
  const workspaces = [] as IWorkspace[];
  for (const userWorkspace of usersWorkspaces) {
    const workspace = userWorkspace.workspace;
    workspaces.push({ id: workspace.id, title: workspace.name });
  }
  return workspaces;
};

export const create = async (
  userId: string,
  data: IWorkspaceCreation,
): Promise<IWorkspace> => {
  const workspaceRepository = getCustomRepository(WorkspaceRepository);
  const userWorkspaceRepository = getCustomRepository(UserWorkspaceRepository);
  const userRepository = getCustomRepository(UserRepository);
  const isTitleUsed = await workspaceRepository.findByName(data.title);
  if (isTitleUsed) {
    throw new HttpError({
      status: HttpCode.CONFLICT,
      message: HttpErrorMessage.WORKSPACE_ALREADY_EXISTS,
    });
  }

  const user = await userRepository.findById(userId);
  const workspace = workspaceRepository.create({ name: data.title });
  await workspaceRepository.save(workspace);
  const userWorkspace = userWorkspaceRepository.create({
    user,
    workspace,
    role: RoleType.ADMIN,
  });
  await userWorkspaceRepository.save(userWorkspace);
  return { id: workspace.id, title: workspace.name };
};

export const createTeam = async (
  userId: string,
  workspaceId: string,
  data: ITeamCreation,
): Promise<ITeam> => {
  const teamRepository = getCustomRepository(TeamRepository);
  const userRepository = getCustomRepository(UserRepository);
  const team = teamRepository.create({ name: data.name, workspaceId });
  await teamRepository.save(team);
  const user = await userRepository.findUserTeams(userId);
  user.teams.push(team);
  userRepository.save(user);
  const users = [{ id: user.id, fullName: user.fullName, avatar: user.avatar }];
  return { id: team.id, name: team.name, workspaceId: team.workspaceId, users };
};

export const updateTeam = async (
  teamId: string,
  body: { name: string },
): Promise<ITeam> => {
  const teamRepository = getCustomRepository(TeamRepository);
  const teamToUpdate = await teamRepository.findByWithUsers(teamId);
  teamToUpdate.name = body.name || teamToUpdate.name;
  const { id, name, workspaceId, users } = await teamRepository.save(teamToUpdate);
  const teamUsers = users.map(({ id, fullName, avatar }) => ({ id, fullName, avatar }));
  return { id, name, workspaceId, users: teamUsers };
};

export const deleteTeam = async (
  id: string,
): Promise<ITeam> => {
  const teamRepository = getCustomRepository(TeamRepository);
  const teamToRemove = await teamRepository.findByWithUsers(id);
  const { name, workspaceId, users } = await teamRepository.remove(teamToRemove);
  const teamUsers = users.map(({ id, fullName, avatar }) => ({ id, fullName, avatar }));
  return { id, workspaceId, name, users: teamUsers };
};
