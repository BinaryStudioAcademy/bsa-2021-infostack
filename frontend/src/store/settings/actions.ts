import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions } from './slice';
import { ActionType } from './common';
import { SettingsApi, WorkspaceApi } from 'services';
import { ITeamCreation, ITeamEditing } from 'common/interfaces/team';

const loadUsers = createAsyncThunk(
  ActionType.SetUsers,
  async (_, { dispatch }): Promise<void> => {
    const response = await new WorkspaceApi().loadUsers();
    dispatch(actions.setUsers(response));
  },
);

const loadTeams = createAsyncThunk(
  ActionType.SetTeams,
  async (_, { dispatch }): Promise<void> => {
    const response = await new SettingsApi().loadTeams();
    dispatch(actions.SetTeams(response));
  },
);

const createTeam = createAsyncThunk(
  ActionType.SetCurrentTeamID,
  async (payload: ITeamCreation, { dispatch }) => {
    try {
      const team = await new SettingsApi().createTeam(payload);
      dispatch(actions.SetCurrentTeamID(team.id));
      dispatch(actions.AddTeam(team));
    } catch (err) {
      alert(err);
    }
  },
);

const updateTeam = createAsyncThunk(
  ActionType.updateTeam,
  async (payload: ITeamEditing, { dispatch }) => {
    try {
      const team = await new SettingsApi().updateTeam(payload);
      dispatch(actions.updateTeam(team));
    } catch (err) {
      alert(err);
    }
  },
);

const deleteTeam = createAsyncThunk(
  ActionType.deleteTeam,
  async (payload: string, { dispatch }) => {
    try {
      await new SettingsApi().deleteTeam(payload);
      dispatch(actions.deleteTeam(payload));
    } catch (err) {
      alert(err);
    }
  },
);

const settingsActions = {
  ...actions,
  loadUsers,
  loadTeams,
  createTeam,
  updateTeam,
  deleteTeam,
};

export { settingsActions };
