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

export const getWorkspaceUsers = async (
  workspaceId: string,
): Promise<IWorkspaceUser[]> => {
  const workspaceRepository = getCustomRepository(WorkspaceRepository);
  const workspace = await workspaceRepository.findByIdWithUsers(workspaceId);
  return mapWorkspaceToWorkspaceUsers(workspace);
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
  workspaceId: string,
  data: ITeamCreation,
): Promise<ITeam> => {
  const teamRepository = getCustomRepository(TeamRepository);
  // const userWorkspaceRepository = getCustomRepository(UserWorkspaceRepository);
  // const userRepository = getCustomRepository(UserRepository);
  // const user = await userRepository.findById(userId);
  const team = teamRepository.create({ name: data.name, workspaceId: workspaceId });
  await teamRepository.save(team);
  // const userWorkspace = userWorkspaceRepository.create({
  //   user,
  //   workspace,
  //   role: RoleType.ADMIN,
  // });
  // await userWorkspaceRepository.save(userWorkspace);
  return { id: team.id, name: team.name, workspaceId: team.workspaceId };
};
