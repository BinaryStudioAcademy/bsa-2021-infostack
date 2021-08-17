import { getCustomRepository } from 'typeorm';
import UserRepository from '../data/repositories/user.repository';
import { ITeam, ITeamCreation } from '../common/interfaces/team';
import {
  mapTeamsToITeams,
  mapTeamToITeam,
} from '../common/mappers/team/map-team-to-iteam';
import TeamRepository from '../data/repositories/team.repository';
import TeamPermissionRepository from '../data/repositories/team-permission.repository';
import { HttpError } from '../common/errors/http-error';
import { HttpCode } from '../common/enums/http-code';
import { HttpErrorMessage } from '../common/enums/http-error-message';
import UserWorkspaceRepository from '../data/repositories/user-workspace.repository';
import { sendMail } from '../common/utils/mailer.util';

export const getAllByWorkspaceId = async (
  workspaceId: string,
): Promise<ITeam[]> => {
  const teamRepository = getCustomRepository(TeamRepository);
  const teams = await teamRepository.findAllByWorkspaceId(workspaceId);

  const teamsWithUsersRoles = mapTeamsToITeams(teams);
  return teamsWithUsersRoles;
};

export const getTeam = async (teamId: string): Promise<ITeam> => {
  const pageRepository = getCustomRepository(TeamRepository);
  const team = await pageRepository.findByIdWithUsers(teamId);
  const teamWithUsersRoles = mapTeamToITeam(team);

  return teamWithUsersRoles;
};

export const create = async (
  userId: string,
  workspaceId: string,
  newTeam: ITeamCreation,
): Promise<ITeam> => {
  if (!newTeam.name) {
    throw new HttpError({
      status: HttpCode.BAD_REQUEST,
      message: HttpErrorMessage.TEAM_EMPTY_STRING,
    });
  }
  const teamRepository = getCustomRepository(TeamRepository);
  const isNameUsed = await teamRepository.findByName(newTeam.name);

  if (isNameUsed) {
    throw new HttpError({
      status: HttpCode.CONFLICT,
      message: HttpErrorMessage.TEAM_NAME_ALREADY_EXISTS,
    });
  }
  const team = teamRepository.create(newTeam);
  const { id, name } = await teamRepository.save({
    workspaceId,
    name: team.name,
  });
  const newTeamDetails = await teamRepository.findByName(team.name);

  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.findUserTeams(userId);

  user.teams.push(newTeamDetails);
  userRepository.save(user);

  const userWorkspaceRepository = getCustomRepository(UserWorkspaceRepository);
  const userWorkspace =
    await userWorkspaceRepository.findByUserIdAndWorkspaceIdDetailed(
      userId,
      workspaceId,
    );

  const users = [
    {
      id: user.id,
      fullName: user.fullName,
      avatar: user.avatar,
      roleInWorkspace: userWorkspace.role,
    },
  ];

  return { id: id, name: name, users };
};

export const updateNameById = async (
  teamId: string,
  newName: string,
): Promise<ITeam> => {
  if (!newName) {
    throw new HttpError({
      status: HttpCode.BAD_REQUEST,
      message: HttpErrorMessage.TEAM_EMPTY_STRING,
    });
  }
  const teamRepository = getCustomRepository(TeamRepository);
  const isNameUsed = await teamRepository.findByName(newName);
  const teamToUpdate = await teamRepository.findByIdWithUsers(teamId);

  if (isNameUsed && isNameUsed.name != teamToUpdate.name) {
    throw new HttpError({
      status: HttpCode.CONFLICT,
      message: HttpErrorMessage.TEAM_NAME_ALREADY_EXISTS,
    });
  }

  teamToUpdate.name = newName || teamToUpdate.name;
  const team = await teamRepository.save(teamToUpdate);
  return mapTeamToITeam(team);
};

export const deleteById = async (id: string): Promise<void> => {
  await getCustomRepository(TeamPermissionRepository).deleteByTeamId(id);
  await getCustomRepository(TeamRepository).deleteById(id);
};

export const addUser = async (
  teamId: string,
  userId: string,
  workspaceId: string,
): Promise<ITeam[]> => {
  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.findById(userId);
  const teamRepository = getCustomRepository(TeamRepository);
  const team = await teamRepository.findByIdWithUsers(teamId);

  team.users.push(user);
  await teamRepository.save(team);

  const teams = await teamRepository.findAllByWorkspaceId(workspaceId);

  const teamsWithUsersRoles = mapTeamsToITeams(teams);

  const message = `Hi, you have been added to new team -- "${team.name}".`;

  await sendMail({
    to: user.email,
    subject: 'You have been added to the Infostack Workspace',
    text: message,
  });

  return teamsWithUsersRoles;
};

export const deleteUser = async (
  teamId: string,
  userId: string,
  workspaceId: string,
): Promise<ITeam[]> => {
  const teamRepository = getCustomRepository(TeamRepository);
  const team = await teamRepository.findByIdWithUsers(teamId);
  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.findById(userId);

  team.users = team.users.filter((user) => user.id !== userId);
  await teamRepository.save(team);

  const teams = await teamRepository.findAllByWorkspaceId(workspaceId);

  const teamsWithUsersRoles = mapTeamsToITeams(teams);

  const message = `Hi, you have been deleled from team -- "${team.name}".`;

  await sendMail({
    to: user.email,
    subject: 'You have been deleted from team',
    text: message,
  });

  return teamsWithUsersRoles;
};
