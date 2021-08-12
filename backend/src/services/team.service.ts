import { getCustomRepository } from 'typeorm';
import UserRepository from '../data/repositories/user.repository';
import { ITeam, ITeamCreation } from '../common/interfaces/team/team.interface';
import { mapTeamToITeam } from '../common/mappers/team/map-team-to-iteam';
import TeamRepository from '../data/repositories/team.repository';
import { HttpError } from '../common/errors/http-error';
import { HttpCode } from '../common/enums/http-code';
import { HttpErrorMessage } from '../common/enums/http-error-message';

export const getAllByWorkspaceId = async (
  workspaceId: string,
): Promise<ITeam[]> => {
  const teamRepository = getCustomRepository(TeamRepository);
  const teams = await teamRepository.findAllByWorkspaceId(workspaceId);
  return teams.map(mapTeamToITeam);
};

export const getTeam = async (pageId: string): Promise<ITeam> => {
  const pageRepository = getCustomRepository(TeamRepository);
  const page = await pageRepository.findByIdWithUsers(pageId);
  return mapTeamToITeam(page);
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
  await teamRepository.save({ workspaceId, name: team.name });
  const newTeamDetails = await teamRepository.findByName(team.name);

  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.findUserTeams(userId);

  user.teams.push(newTeamDetails);
  userRepository.save(user);

  const users = [{ id: user.id, fullName: user.fullName, avatar: user.avatar }];
  return { id: team.id, name: team.name, users };
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
  if (isNameUsed) {
    throw new HttpError({
      status: HttpCode.CONFLICT,
      message: HttpErrorMessage.TEAM_NAME_ALREADY_EXISTS,
    });
  }
  const teamToUpdate = await teamRepository.findByIdWithUsers(teamId);
  teamToUpdate.name = newName || teamToUpdate.name;
  const team = await teamRepository.save(teamToUpdate);
  return mapTeamToITeam(team);
};

export const deleteById = async (id: string): Promise<ITeam> => {
  const teamRepository = getCustomRepository(TeamRepository);
  const teamToRemove = await teamRepository.findByIdWithUsers(id);
  const team = await teamRepository.remove(teamToRemove);
  return mapTeamToITeam(team);
};
