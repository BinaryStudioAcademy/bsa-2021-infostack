import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITeamEditing, ITeam, ITeamAddUser } from 'common/interfaces/team';
import { teamApi } from 'services';
import { ActionType } from './common';

export const fetchTeams = createAsyncThunk<ITeam[]>(
  ActionType.FETCH_TEAMS,
  () => teamApi.getTeams(),
);

export const createTeam = createAsyncThunk<ITeam, string>(
  ActionType.CREATE_TEAM,
  (name) => teamApi.createTeam(name),
);

export const updateTeam = createAsyncThunk<ITeam, ITeamEditing>(
  ActionType.UPDATE_TEAM,
  (payload) => teamApi.updateTeam(payload),
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
  createTeam,
  updateTeam,
  deleteTeam,
  addUser,
  deleteUser,
};

export { teamsActions };
