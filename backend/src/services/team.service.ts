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
import { EntityType } from '../common/enums/entity-type';
import { SocketEvents } from '../common/enums/socket';
import { Server } from 'socket.io';
import { User } from '../data/entities/user';
import NotificationRepository from '../data/repositories/notification.repository';
import { Team } from '../data/entities/team';

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
  io: Server,
): Promise<ITeam[]> => {
  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.findById(userId);
  const teamRepository = getCustomRepository(TeamRepository);
  const team = await teamRepository.findByIdWithUsers(teamId);

  team.users.push(user);
  await teamRepository.save(team);

  const teams = await teamRepository.findAllByWorkspaceId(workspaceId);

  const teamsWithUsersRoles = mapTeamsToITeams(teams);

  notifyUser(team, user, 'add', io);

  return teamsWithUsersRoles;
};

export const deleteUser = async (
  teamId: string,
  userId: string,
  workspaceId: string,
  io: Server,
): Promise<ITeam[]> => {
  const teamRepository = getCustomRepository(TeamRepository);
  const team = await teamRepository.findByIdWithUsers(teamId);
  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.findById(userId);

  team.users = team.users.filter((user) => user.id !== userId);
  await teamRepository.save(team);

  const teams = await teamRepository.findAllByWorkspaceId(workspaceId);

  const teamsWithUsersRoles = mapTeamsToITeams(teams);

  notifyUser(team, user, 'delete', io);

  return teamsWithUsersRoles;
};

export const notifyUser = async (
  team: Team,
  user: User,
  reason: string,
  io: Server,
): Promise<void> => {
  const reasonText = reason === 'add' ? 'added to' : 'deleted from';

  const notificationRepository = getCustomRepository(NotificationRepository);

  const title = `You have been ${reasonText} Infostack team.`;
  const body = `You have been ${reasonText} Infostack team -- "${team.name}".`;

  io.to(user.id).emit(SocketEvents.NOTIFICATION_NEW);
  await notificationRepository.createAndSave(
    body,
    null,
    EntityType.TEAM,
    team.id,
    user.id,
    false,
  );

  await sendMail({
    to: user.email,
    subject: title,
    text: body,
  });
};
