import { getCustomRepository } from 'typeorm';
import { Server } from 'socket.io';
import {
  UserRepository,
  UserWorkspaceRepository,
  NotificationRepository,
  WorkspaceRepository,
  TeamPermissionRepository,
  TeamRepository,
} from '../data/repositories';
import { User } from '../data/entities/user';
import { Team } from '../data/entities/team';
import { ITeam, ITeamCreation } from '../common/interfaces/team';
import { mapTeamToITeam } from '../common/mappers/team/map-team-to-iteam';
import { mapTeamsToITeams } from '../common/mappers/team/map-teams-to-iteams';
import { mapTeamToITeamWithoutRoles } from '../common/mappers/team/map-team-to-iteam-without-roles';
import { HttpCode } from '../common/enums/http-code';
import { HttpErrorMessage } from '../common/enums/http-error-message';
import { EntityType } from '../common/enums/entity-type';
import { SocketEvents } from '../common/enums/socket';
import { NotificationType } from '../common/enums/notification-type';
import { HttpError } from '../common/errors/http-error';
import { sendMail } from '../common/utils/mailer.util';
import { isNotify } from '../common/helpers/isNotify.helper';

export const getAllByWorkspaceId = async (
  workspaceId: string,
): Promise<ITeam[]> => {
  const teams = await getCustomRepository(TeamRepository).findAllByWorkspaceId(
    workspaceId,
  );

  const teamsWithUsersRoles = mapTeamsToITeams(teams);
  return teamsWithUsersRoles;
};

export const getAllByUserId = async (
  userId: string,
  workspaceId: string,
): Promise<Team[]> => {
  const user = await getCustomRepository(
    UserRepository,
  ).findUserTeamsInWorkspace(userId, workspaceId);

  return user?.teams ? user.teams : [];
};

export const getTeam = async (
  teamId: string,
  workspaceId: string,
): Promise<ITeam> => {
  const team = await getCustomRepository(TeamRepository).findByIdWithUsers(
    teamId,
    workspaceId,
  );
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
  const isNameUsed = await teamRepository.findByNameInWorkspace(
    newTeam.name,
    workspaceId,
  );

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
  const newTeamDetails = await teamRepository.findByNameInWorkspace(
    team.name,
    workspaceId,
  );

  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.findUserTeams(userId);

  user.teams.push(newTeamDetails);
  userRepository.save(user);

  const userWorkspace = await getCustomRepository(
    UserWorkspaceRepository,
  ).findByUserIdAndWorkspaceIdDetailed(userId, workspaceId);

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
  workspaceId: string,
): Promise<ITeam> => {
  if (!newName) {
    throw new HttpError({
      status: HttpCode.BAD_REQUEST,
      message: HttpErrorMessage.TEAM_EMPTY_STRING,
    });
  }
  const teamRepository = getCustomRepository(TeamRepository);
  const isNameUsed = await teamRepository.findByNameInWorkspace(
    newName,
    workspaceId,
  );
  const teamToUpdate = await teamRepository.findByIdWithUsers(
    teamId,
    workspaceId,
  );

  if (isNameUsed && isNameUsed.name != teamToUpdate.name) {
    throw new HttpError({
      status: HttpCode.CONFLICT,
      message: HttpErrorMessage.TEAM_NAME_ALREADY_EXISTS,
    });
  }

  teamToUpdate.name = newName || teamToUpdate.name;
  const team = await teamRepository.save(teamToUpdate);

  return mapTeamToITeamWithoutRoles(team);
};

export const deleteById = async (
  id: string,
  workspaceId: string,
): Promise<void> => {
  await getCustomRepository(TeamPermissionRepository).deleteByTeamId(id);
  await getCustomRepository(TeamRepository).deleteById(id, workspaceId);
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
  const team = await teamRepository.findByIdWithUsers(teamId, workspaceId);
  const workspaceRepository = getCustomRepository(WorkspaceRepository);
  const workspace = await workspaceRepository.findById(workspaceId);

  team.users.push(user);
  await teamRepository.save(team);

  const teams = await teamRepository.findAllByWorkspaceId(workspaceId);

  const teamsWithUsersRoles = mapTeamsToITeams(teams);

  notifyUser(team, user, `added to ${workspace.name}`, io);

  return teamsWithUsersRoles;
};

export const deleteUser = async (
  teamId: string,
  userId: string,
  workspaceId: string,
  io: Server,
): Promise<ITeam[]> => {
  const teamRepository = getCustomRepository(TeamRepository);
  const team = await teamRepository.findByIdWithUsers(teamId, workspaceId);
  const user = await getCustomRepository(UserRepository).findById(userId);
  const workspaceRepository = getCustomRepository(WorkspaceRepository);
  const workspace = await workspaceRepository.findById(workspaceId);

  team.users = team.users.filter((user) => user.id !== userId);
  await teamRepository.save(team);

  const teams = await teamRepository.findAllByWorkspaceId(workspaceId);

  const teamsWithUsersRoles = mapTeamsToITeams(teams);

  notifyUser(team, user, `deleted from ${workspace.name}`, io);

  return teamsWithUsersRoles;
};

export const notifyUser = async (
  team: Team,
  user: User,
  reason: string,
  io: Server,
): Promise<void> => {
  const title = `You have been ${reason} team.`;
  const body = `You have been ${reason} team -- "${team.name}".`;

  const isNotifyTeam = await isNotify(user.id, NotificationType.TEAM);
  const isNotifyTeamEmail = await isNotify(
    user.id,
    NotificationType.TEAM_EMAIL,
  );

  if (isNotifyTeam) {
    io.to(user.id).emit(SocketEvents.NOTIFICATION_NEW);
    await getCustomRepository(NotificationRepository).createAndSave(
      body,
      null,
      EntityType.TEAM,
      team.id,
      user.id,
      false,
    );
  }
  if (isNotifyTeamEmail) {
    await sendMail({
      to: user.email,
      subject: title,
      text: body,
    });
  }
};
