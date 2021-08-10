import { getCustomRepository } from 'typeorm';
import UserRepository from '../data/repositories/user.repository';
import { ITeam, ITeamCreation } from '../common/interfaces/team/team.interface';
import { mapUsersToTeamUsers } from '../common/mappers/team/map-users-to-team-users';
import { mapTeams } from '../common/mappers/team/map-teams';
import TeamRepository from '../data/repositories/team.repository';
import { HttpError } from '../common/errors/http-error';
import { HttpCode } from '../common/enums/http-code';
import { HttpErrorMessage } from '../common/enums/http-error-message';

export const getAllByWorkspaceId = async (
  workspaceId: string,
): Promise<ITeam[]> => {
  const teamRepository = getCustomRepository(TeamRepository);
  const teams = await teamRepository.findAllByWorkspaceId(workspaceId);
  return mapTeams(teams);
};

export const create = async (
  userId: string,
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
  await teamRepository.save(team);
  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.findUserTeams(userId);
  user.teams.push(team);
  userRepository.save(user);
  const users = [{ id: user.id, fullName: user.fullName, avatar: user.avatar }];
  return { id: team.id, name: team.name, workspaceId: team.workspaceId, users };
};

export const updateNameById = async (
  teamId: string,
  newName: string ,
): Promise<ITeam> => {
  if (!newName) {
    throw new HttpError({
      status: HttpCode.BAD_REQUEST,
      message: HttpErrorMessage.TEAM_EMPTY_STRING,
    });
  }
  const teamRepository = getCustomRepository(TeamRepository);
  const isNameUsed = await teamRepository.findByName(newName);
  if (isNameUsed) {
    throw new HttpError({
      status: HttpCode.CONFLICT,
      message: HttpErrorMessage.TEAM_NAME_ALREADY_EXISTS,
    });
  }
  const teamToUpdate = await teamRepository.findByIdWithUsers(teamId);
  teamToUpdate.name = newName || teamToUpdate.name;
  const { id, name, workspaceId, users } = await teamRepository.save(teamToUpdate);
  const teamUsers = mapUsersToTeamUsers(users);
  return { id, name, workspaceId, users: teamUsers };
};

export const deleteById = async (
  id: string,
): Promise<ITeam> => {
  const teamRepository = getCustomRepository(TeamRepository);
  const teamToRemove = await teamRepository.findByIdWithUsers(id);
  const { name, workspaceId, users } = await teamRepository.remove(teamToRemove);
  const teamUsers = mapUsersToTeamUsers(users);
  return { id, workspaceId, name, users: teamUsers };
};
