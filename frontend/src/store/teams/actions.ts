import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITeamEditing, ITeam } from 'common/interfaces/team';
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

const teamsActions = {
  fetchTeams,
  createTeam,
  updateTeam,
  deleteTeam,
};

export { teamsActions };
