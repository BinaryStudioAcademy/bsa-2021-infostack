import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITeamEditing, ITeam, ITeamAddUser } from 'common/interfaces/team';
import { teamApi } from 'services';
import { ActionType } from './common';

export const fetchTeams = createAsyncThunk<ITeam[]>(
  ActionType.FETCH_TEAMS,
  () => teamApi.getTeams(),
);

export const fetchTeamsForUser = createAsyncThunk<ITeam[], string>(
  ActionType.FETCH_TEAMS_FOR_USER,
  (userId: string) => teamApi.getTeamsForUser(userId),
);

export const createTeam = createAsyncThunk<ITeam, string>(
  ActionType.CREATE_TEAM,
  (name) => teamApi.createTeam(name),
);

export const updateTeam = createAsyncThunk<ITeam, ITeamEditing>(
  ActionType.UPDATE_TEAM,
  (payload) => teamApi.updateTeam(payload),
);

export const setNewTeamOwner = createAsyncThunk<ITeam, ITeamEditing>(
  ActionType.UPDATE_TEAM,
  (payload) => teamApi.updateTeamOwner(payload),
);

export const deleteTeam = createAsyncThunk<void, string>(
  ActionType.DELETE_TEAM,
  (id) => teamApi.deleteTeam(id),
);

export const addUser = createAsyncThunk<ITeam[], ITeamAddUser>(
  ActionType.ADD_USER,
  (payload: ITeamAddUser) => teamApi.addUser(payload),
);

export const deleteUser = createAsyncThunk<ITeam[], ITeamAddUser>(
  ActionType.DELETE_USER,
  (payload: ITeamAddUser) => teamApi.deleteUser(payload),
);

const teamsActions = {
  fetchTeams,
  fetchTeamsForUser,
  createTeam,
  updateTeam,
  deleteTeam,
  addUser,
  deleteUser,
  setNewTeamOwner,
};

export { teamsActions };
