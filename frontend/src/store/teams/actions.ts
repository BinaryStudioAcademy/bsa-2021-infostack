import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITeamEditing, ITeam, ITeamAddUser } from 'common/interfaces/team';
import { TeamApi } from 'services';
import { ActionType } from './common';

export const fetchTeams = createAsyncThunk<ITeam[]>(
  ActionType.FETCH_TEAMS,
  () => new TeamApi().getTeams(),
);

export const createTeam = createAsyncThunk<ITeam, string>(
  ActionType.CREATE_TEAM,
  (name) => new TeamApi().createTeam(name),
);

export const updateTeam = createAsyncThunk<ITeam, ITeamEditing>(
  ActionType.UPDATE_TEAM,
  (payload) => new TeamApi().updateTeam(payload),
);

export const deleteTeam = createAsyncThunk<void, string>(
  ActionType.DELETE_TEAM,
  (id) => new TeamApi().deleteTeam(id),
);

export const addUser = createAsyncThunk<ITeam[], ITeamAddUser>(
  ActionType.ADD_USER,
  (payload: ITeamAddUser) => new TeamApi().addUser(payload),
);

export const deleteUser = createAsyncThunk<ITeam[], ITeamAddUser>(
  ActionType.DELETE_USER,
  (payload: ITeamAddUser) => new TeamApi().deleteUser(payload),
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
